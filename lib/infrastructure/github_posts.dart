import 'package:amdiaz/domain/post.dart';
import 'package:amdiaz/domain/posts.dart';
import 'package:github/github.dart';

class GithubPosts implements Posts {
  final GitHub github;

  GithubPosts(this.github);

  @override
  Future<Iterable<Post>> getAll() async {
    var repositorySlug = RepositorySlug('xenxi', 'blog');

    final posts =
        await github.repositories.getContents(repositorySlug, './Posts/');

    return mapFrom(posts, repositorySlug).toList();
  }

  Stream<Post> mapFrom(
      RepositoryContents posts, RepositorySlug repositorySlug) async* {
    for (final post in posts.tree ?? <GitHubFile>[]) {
      if (post.type == 'file') {
        final contents =
            await github.repositories.getContents(repositorySlug, post.path!);
        final title = post.name!;
        final content = contents.file!.text;
        yield Post(title: title, content: content);
      }
    }
  }
}
