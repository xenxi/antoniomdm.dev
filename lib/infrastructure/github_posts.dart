import 'package:amdiaz/domain/posts.dart';
import 'package:github/github.dart';

class GithubPosts implements Posts {
  final GitHub github;

  GithubPosts(this.github);

  @override
  Future<Iterable<String>> getAll() {
    // TODO: implement getAll
    throw UnimplementedError();
  }
}
