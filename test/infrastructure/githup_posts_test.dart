import 'dart:io';

import 'package:amdiaz/infrastructure/github_posts.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:github/github.dart';

void main() {
  group('GithupPosts should', () {
    test('get all posts', () async {
      dotenv.testLoad(fileInput: File('test/.env').readAsStringSync());
      final token = dotenv.get('TOKEN', fallback: '');
      final github = GitHub(auth: Authentication.withToken(token));
      final githubPosts = GithubPosts(github);

      final posts = await githubPosts.getAll();

      expect(posts, isNotEmpty);
    });
  });
}
