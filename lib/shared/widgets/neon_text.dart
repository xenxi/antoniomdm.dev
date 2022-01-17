import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';

class NeonText extends StatelessWidget {
  final String text;
  final double fontSize;
  const NeonText(
    this.text, {
    this.fontSize = 140,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Text(
          text,
          style: _lightsOffFontStyle(),
        ),
        AnimatedTextKit(
          repeatForever: true,
          animatedTexts: [
            FlickerAnimatedText(text,
                textStyle: _lightsOnFontStyle(Colors.greenAccent)),
          ],
        ),
      ],
    );
  }

  TextStyle _lightsOffFontStyle() => TextStyle(
        fontFamily: 'Neon',
        fontSize: fontSize,
        color: Colors.grey,
      );

  TextStyle _lightsOnFontStyle(Color color) => _lightsOffFontStyle().copyWith(
        color: color,
        shadows: [
          Shadow(
            blurRadius: 12.0,
            color: color.withAlpha(200),
            offset: const Offset(1, -6),
          ),
        ],
      );
}
