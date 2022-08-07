import 'package:amdiaz/infrastructure/github_posts.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:github/github.dart';

void main() {
  const token = String.fromEnvironment('TOKEN');
  final github = GitHub(auth: Authentication.withToken(token));
  group('GithupPosts should', () {
    test('get all posts', () async {
      final githubPosts = GithubPosts(github);

      final posts = await githubPosts.getAll();

      expect(posts, isNotEmpty);
    });
  });
}
