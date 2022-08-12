import 'package:amdiaz/infrastructure/github_posts.dart';
import 'package:amdiaz/presentation/views/blog_view.dart';
import 'package:amdiaz/presentation/views/experience_view.dart';
import 'package:amdiaz/presentation/views/under_construction_view.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:github/github.dart';

class FluroRouteGenerator {
  final FluroRouter _router;
  FluroRouteGenerator() : _router = FluroRouter() {
    _configureRoutes();
  }
  Route<dynamic>? generateRoute(RouteSettings settings) =>
      _router.generator(settings);

  void _configureRoutes() {
    _router.define(
      '/',
      handler: Handler(
        handlerFunc: (context, params) => const UnderConstructionView(),
      ),
      transitionType: TransitionType.materialFullScreenDialog,
    );
    _router.define(
      'experience',
      handler: Handler(
        handlerFunc: (context, params) => const ExperienceView(),
      ),
      transitionType: TransitionType.materialFullScreenDialog,
    );
    _router.define(
      'blog',
      handler: Handler(
        handlerFunc: (context, params) {
          const token =
              String.fromEnvironment('G_TOKEN', defaultValue: 'not found');
          final github = GitHub(auth: Authentication.withToken(token));
          final githubPosts = GithubPosts(github);
          return BlogView(posts: githubPosts);
        },
      ),
      transitionType: TransitionType.materialFullScreenDialog,
    );
  }
}
