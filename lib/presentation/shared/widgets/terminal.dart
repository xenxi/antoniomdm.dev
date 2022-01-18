import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../../views/under_construction_view.dart';

class Terminal extends HookWidget {
  static final background = TweenSequence<Color?>([
    TweenSequenceItem(
      weight: 1.0,
      tween: ColorTween(
        begin: Colors.green.withOpacity(.5),
        end: Colors.transparent,
      ),
    ),
  ]);

  const Terminal({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller =
        useAnimationController(duration: const Duration(milliseconds: 1500))
          ..repeat();
    final nameIsVisible = useState(false);
    return Stack(
      fit: StackFit.expand,
      children: [
        AnimatedBuilder(
          builder: (BuildContext context, Widget? child) {
            return Container(
              color:
                  background.evaluate(AlwaysStoppedAnimation(controller.value)),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
              child: UnderConstructionView(nameIsVisible: nameIsVisible),
            );
          },
          animation: controller,
        ),
      ],
    );
  }
}
