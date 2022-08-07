import 'package:amdiaz/domain/post.dart';
import 'package:amdiaz/domain/posts.dart';
import 'package:github/github.dart';

class GithubPosts implements Posts {
  final GitHub github;
  final RepositorySlug slug = RepositorySlug('xenxi', 'blog');
  GithubPosts(this.github);

  @override
  Future<Iterable<Post>> getAll() async {
    final files = await getAllFiles();

    return mapFrom(files.tree ?? []).toList();
  }

  Future<RepositoryContents> getAllFiles() async =>
      await github.repositories.getContents(slug, './Posts/');

  Stream<Post> mapFrom(Iterable<GitHubFile> posts) async* {
    final files = posts.where((file) => file.type == 'file');
    for (final post in files) {
      yield await mapPost(post);
    }
  }

  Future<Post> mapPost(GitHubFile post) async {
    final contents = await github.repositories.getContents(slug, post.path!);
    final title = post.name!;
    final content = contents.file!.text;

    return Post(title: title, content: content);
  }
}
