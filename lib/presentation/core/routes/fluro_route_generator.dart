import 'package:amdiaz/presentation/views/blog_view.dart';
import 'package:amdiaz/presentation/views/experience_view.dart';
import 'package:amdiaz/presentation/views/under_construction_view.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

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
        handlerFunc: (context, params) => const BlogView(),
      ),
      transitionType: TransitionType.materialFullScreenDialog,
    );
  }
}
