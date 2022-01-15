import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class Terminal extends HookWidget {
  const Terminal({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final background = TweenSequence<Color?>([
      TweenSequenceItem(
        weight: 1.0,
        tween: ColorTween(
          begin: Colors.green.withOpacity(.5),
          end: Colors.transparent,
        ),
      ),
    ]);
    final controller =
        useAnimationController(duration: const Duration(milliseconds: 1500))
          ..repeat();
    return Expanded(
      child: Stack(
        children: [
          AnimatedBuilder(
            builder: (BuildContext context, Widget? child) {
              return Container(
                color: background
                    .evaluate(AlwaysStoppedAnimation(controller.value)),
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 50),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      'Antonio Manuel Díaz Moreno',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headline1,
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'Developer | .NET | TypeScript | Dart | Angular | Flutter 🚀',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.subtitle1,
                    ),
                    const Spacer(),
                    Text(
                      'Under Construction',
                      style: Theme.of(context).textTheme.headline2,
                    ),
                    const Spacer(),
                  ],
                ),
              );
            },
            animation: controller,
          ),
        ],
      ),
    );
    // }

    // Animatable<Color> background = TweenSequence<Color>([
    //   TweenSequenceItem(
    //     weight: 1.0,
    //     tween: ColorTween(
    //       begin: Colors.blueAccent,
    //       end: Colors.greenAccent,
    //     ),
    //   ),
    //   TweenSequenceItem(
    //     weight: 1.0,
    //     tween: ColorTween(
    //       begin: Colors.greenAccent,
    //       end: Colors.pinkAccent,
    //     ),
    //   ),
    //   TweenSequenceItem(
    //     weight: 1.0,
    //     tween: ColorTween(
    //       begin: Colors.pinkAccent,
    //       end: Colors.orangeAccent,
    //     ),
    //   ),
    //   TweenSequenceItem(
    //     weight: 1.0,
    //     tween: ColorTween(
    //       begin: Colors.orangeAccent,
    //       end: Colors.blueAccent,
    //     ),
    //   ),
    // ]);
  }
}
