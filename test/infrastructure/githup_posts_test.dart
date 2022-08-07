import 'dart:io';

import 'package:amdiaz/infrastructure/github_posts.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:github/github.dart';

void main() {
  dotenv.testLoad(fileInput: File('assets/.env').readAsStringSync());
  const token = String.fromEnvironment('TOKEN', defaultValue: '');
  final github = GitHub(auth: Authentication.withToken(token));
  group('GithupPosts should', () {
    test('get all posts', () async {
      final githubPosts = GithubPosts(github);

      final posts = await githubPosts.getAll();

      expect(posts, isNotEmpty);
    });
  });
}
