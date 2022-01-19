import 'package:antoniomdm/presentation/core/routes/fluro_route_generator.dart';
import 'package:flutter/material.dart';

import 'core/custom_theme.dart';
import 'layouts/arcade/arcade_layout.dart';

class MyResumeApp extends StatelessWidget {
  final FluroRouteGenerator _routeGenerator = FluroRouteGenerator();
  MyResumeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      theme: CustomTheme.light,
      onGenerateRoute: _routeGenerator.generateRoute,
      builder: (context, child) => ArcadeLayout(
          child: child ??
              Container(
                child: Center(
                  child: Text('ERROR'),
                ),
              )),
    );
  }
}
