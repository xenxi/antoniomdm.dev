import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';

class UnderConstructionView extends StatelessWidget {
  const UnderConstructionView({
    Key? key,
    required this.nameIsVisible,
  }) : super(key: key);

  final ValueNotifier<bool> nameIsVisible;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Column(
          children: [
            const SizedBox(height: 20),
            AnimatedTextKit(
              isRepeatingAnimation: false,
              onFinished: () => nameIsVisible.value = true,
              animatedTexts: [
                TypewriterAnimatedText('Antonio Manuel Díaz Moreno',
                    speed: const Duration(milliseconds: 100),
                    textStyle: Theme.of(context).textTheme.headline1,
                    textAlign: TextAlign.center),
              ],
            ),
            const SizedBox(height: 10),
            if (nameIsVisible.value)
              AnimatedTextKit(
                isRepeatingAnimation: false,
                animatedTexts: [
                  TypewriterAnimatedText(
                    'Developer | .NET | TypeScript | Dart | Angular | Flutter 🚀',
                    textStyle: Theme.of(context).textTheme.subtitle1,
                    textAlign: TextAlign.center,
                    speed: const Duration(milliseconds: 100),
                  ),
                ],
              ),
          ],
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: AnimatedTextKit(
            repeatForever: true,
            animatedTexts: [
              FlickerAnimatedText('Under Construction',
                  textStyle: Theme.of(context).textTheme.headline2),
            ],
          ),
        ),
        // const Spacer(),
      ],
    );
  }
}
