import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:antoniomdm/shared/values/location.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class UnderConstructionView extends HookWidget {
  const UnderConstructionView({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final nameIsVisible = useState(false);
    return Stack(
      children: [
        Align(
          alignment: Alignment.center,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              AnimatedTextKit(
                isRepeatingAnimation: false,
                onFinished: () => nameIsVisible.value = true,
                animatedTexts: [
                  TypewriterAnimatedText(Location.fullName,
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
