import 'package:flutter/material.dart';

import 'package:amdiaz/domain/posts.dart';

class BlogView extends StatelessWidget {
  final Posts posts;
  const BlogView({
    Key? key,
    required this.posts,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: posts.getAll(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.hasData) {
          final posts = snapshot.data;
          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (BuildContext context, int index) {
              final post = posts[index];
              return ListTile(
                title: Text(post.title),
                subtitle: Text(post.content),
              );
            },
          );
        }
        return const Center(
          child: CircularProgressIndicator(),
        );
      },
    );
  }
}
