import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class FlickerAnimation extends HookWidget {
  final Duration? duration;
  final Widget child;
  const FlickerAnimation({
    required this.child,
    this.duration,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = useAnimationController(
        duration: duration ?? const Duration(milliseconds: 1900))
      ..repeat();

    final animation = CurvedAnimation(
      parent: controller,
      curve: Curves.bounceInOut,
    );
    return FadeTransition(
      opacity: animation,
      child: child,
    );
  }
}
