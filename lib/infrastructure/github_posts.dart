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

  Stream<Post> mapFrom(Iterable<GitHubFile> repositoryContent) async* {
    final files = repositoryContent.where((file) => file.type == 'file');
    for (final file in files) {
      yield await getPost(file);
    }
  }

  Future<Post> getPost(GitHubFile post) async {
    final contents = await github.repositories.getContents(slug, post.path!);
    final title = post.name!;
    final content = contents.file!.text;

    return Post(title: title, content: content);
  }
}
