import 'package:amdiaz/domain/posts.dart';
import 'package:github/github.dart';

class GithubPosts implements Posts {
  final GitHub github;

  GithubPosts(this.github);

  @override
  Future<Iterable<String>> getAll() async {
    var repositorySlug = RepositorySlug('xenxi', 'blog');

    final posts =
        await github.repositories.getContents(repositorySlug, './Posts/');

    return posts.tree
            ?.where((element) => element.name?.isNotEmpty == true)
            .map((e) => e.name!) ??
        [];
  }
}
