import 'package:amdiaz/domain/post.dart';

abstract class Posts {
  Future<Iterable<Post>> getAll();
}
