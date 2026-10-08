import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const temporaryRoot = mkdtempSync(join(tmpdir(), 'antonios-ads-builds-'));
const astroCli = join(root, 'node_modules', 'astro', 'bin', 'astro.mjs');
const publisherId = 'ca-pub-2673939834159464';
const simulatedSlotId = '0'.repeat(10);
const adsTxt = 'google.com, pub-2673939834159464, DIRECT, f08c47fec0942fa0\n';

function build(name, adsEnvironment) {
  const output = join(temporaryRoot, name);
  const environment = { ...process.env, ...adsEnvironment };
  delete environment.PUBLIC_GA_MEASUREMENT_ID;

  execFileSync(
    process.execPath,
    [astroCli, 'build', '--outDir', output],
    { cwd: root, env: environment, stdio: 'pipe' },
  );
  return output;
}

function html(output, ...segments) {
  return readFileSync(join(output, ...segments, 'index.html'), 'utf8');
}

function occurrences(value, token) {
  return value.split(token).length - 1;
}

try {
  const disabled = build('disabled', {
    PUBLIC_ADS_ENABLED: '',
    PUBLIC_ADS_CLIENT_ID: '',
    PUBLIC_ADS_ARTICLE_SLOT_ID: '',
  });
  const disabledArticle = html(
    disabled,
    'blog',
    'la-pregunta-se-queda',
  );

  assert.equal(
    readFileSync(join(disabled, 'ads.txt'), 'utf8'),
    adsTxt,
  );
  assert.equal(occurrences(disabledArticle, 'class="adsbygoogle"'), 0);
  assert.equal(occurrences(disabledArticle, 'adsbygoogle.js?client='), 0);

  const verification = build('verification', {
    PUBLIC_ADS_ENABLED: 'false',
    PUBLIC_ADS_CLIENT_ID: publisherId,
    PUBLIC_ADS_ARTICLE_SLOT_ID: '',
  });
  assert.equal(occurrences(html(verification, 'blog'), 'adsbygoogle.js?client='), 1);
  assert.equal(occurrences(html(verification, 'blog', 'la-pregunta-se-queda'), 'class="adsbygoogle"'), 0);

  const enabled = build('enabled', {
    PUBLIC_ADS_ENABLED: 'true',
    PUBLIC_ADS_CLIENT_ID: publisherId,
    PUBLIC_ADS_ARTICLE_SLOT_ID: simulatedSlotId,
  });
  const article = html(enabled, 'blog', 'la-pregunta-se-queda');
  const englishArticle = html(
    enabled,
    'en',
    'blog',
    'the-question-remains',
  );
  const landing = html(enabled, 'blog');
  const portfolio = html(enabled);

  assert.equal(occurrences(article, 'class="adsbygoogle"'), 1);
  assert.equal(
    occurrences(article, `adsbygoogle.js?client=${publisherId}`),
    1,
  );
  assert.equal(occurrences(article, 'data-ad-position="article-end"'), 1);
  assert.equal(occurrences(article, `data-ad-client="${publisherId}"`), 1);
  assert.match(article, /AD_01 \/ PUBLICIDAD/);
  assert.match(englishArticle, /AD_01 \/ ADVERTISEMENT/);
  assert.equal(occurrences(landing, 'class="adsbygoogle"'), 0);
  assert.equal(occurrences(landing, 'adsbygoogle.js?client='), 1);
  assert.equal(occurrences(portfolio, 'class="adsbygoogle"'), 0);
  assert.equal(occurrences(portfolio, 'adsbygoogle.js?client='), 0);
  assert.equal(readFileSync(join(enabled, 'ads.txt'), 'utf8'), adsTxt);

  // Scan every generated route, including aliases and both languages.
  for (const output of [disabled, verification, enabled]) {
    for (const file of readdirSync(output, { recursive: true }).filter(file => file.endsWith('.html'))) {
      const page = readFileSync(join(output, file), 'utf8');
      const units = occurrences(page, 'class="adsbygoogle"');
      const isArticle = page.includes('data-oos-article=');
      assert.equal(units, output === enabled && isArticle ? 1 : 0, `${file}: incorrect ad inventory`);
      if (units) assert.equal(occurrences(page, 'adsbygoogle.js?client='), 1, `${file}: loader count`);
    }
  }
  console.log('AdSense builds verified across all routes: disabled, verification-only and simulated enabled.');
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
