import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class TerminalContainer extends HookWidget {
  final Widget child;
  static final background = TweenSequence<Color?>([
    TweenSequenceItem(
      weight: 1.0,
      tween: ColorTween(
        begin: Colors.green.withOpacity(.5),
        end: Colors.transparent,
      ),
    ),
  ]);

  const TerminalContainer({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = useAnimationController(
      duration: const Duration(milliseconds: 1500),
    )..repeat();

    return AnimatedBuilder(
      builder: (BuildContext context, Widget? child) {
        return Container(
          color: background.evaluate(AlwaysStoppedAnimation(controller.value)),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 30),
          child: this.child,
        );
      },
      animation: controller,
    );
  }
}
