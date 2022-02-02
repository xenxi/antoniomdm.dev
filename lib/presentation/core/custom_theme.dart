import 'package:flutter/material.dart';

class CustomTheme {
  static const Color primaryText1 = Colors.green;
  static const Color primaryText2 = Colors.amber;
  static ThemeData get light {
    final defaultDarkTheme = ThemeData.dark();
    return defaultDarkTheme.copyWith(
      textTheme: defaultDarkTheme.textTheme.copyWith(
        headline1: const TextStyle(
            color: primaryText2,
            fontSize: 40,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.5,
            fontFamily: 'Edunline'),
        headline2: const TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.normal,
            fontFamily: 'Arcade'),
        subtitle1: const TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.normal,
            fontFamily: 'Arcade'),
      ),
    );
  }
}
