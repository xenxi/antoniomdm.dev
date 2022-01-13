import 'package:antoniomdm/presentation/under_construction_page.dart';
import 'package:flutter/material.dart';

import 'core/custom_theme.dart';

class MyResumeApp extends StatelessWidget {
  const MyResumeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      theme: CustomTheme.light,
      home: const UnderConstructionPage(),
    );
  }
}
