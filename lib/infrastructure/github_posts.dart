import 'package:amdiaz/domain/post.dart';
import 'package:amdiaz/domain/posts.dart';
import 'package:github/github.dart';

class GithubPosts implements Posts {
  final GitHub github;
  final RepositorySlug slug = RepositorySlug('xenxi', 'blog');
  GithubPosts(this.github);

  @override
  Future<Iterable<Post>> getAll() async {
    final posts = await getAllFiles();

    return mapFrom(posts).toList();
  }

  Future<RepositoryContents> getAllFiles() async =>
      await github.repositories.getContents(slug, './Posts/');

  Stream<Post> mapFrom(RepositoryContents posts) async* {
    for (final post in posts.tree ?? <GitHubFile>[]) {
      if (post.type == 'file') {
        final contents =
            await github.repositories.getContents(slug, post.path!);
        final title = post.name!;
        final content = contents.file!.text;
        yield Post(title: title, content: content);
      }
    }
  }
}
