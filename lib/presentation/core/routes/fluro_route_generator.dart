import 'package:antoniomdm/presentation/views/under_construction_view.dart';
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
  }
}
