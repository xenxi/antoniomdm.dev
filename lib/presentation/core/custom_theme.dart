import 'package:flutter/material.dart';

class CustomTheme {
  static const Color primaryText1 = Colors.green;
  static ThemeData get light {
    final defaultDarkTheme = ThemeData.dark();
    return defaultDarkTheme.copyWith(
      textTheme: defaultDarkTheme.textTheme.copyWith(
        headline1: const TextStyle(
          color: primaryText1,
          fontSize: 50,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
