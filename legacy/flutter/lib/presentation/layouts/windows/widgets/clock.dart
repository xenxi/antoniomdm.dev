import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:intl/intl.dart';

class Clock extends HookWidget {
  static final DateFormat timeFormat = DateFormat('kk:mm:ss');
  static final DateFormat dateFormat = DateFormat('dd/MM/yyyy');
  const Clock({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = useAnimationController(
      duration: const Duration(seconds: 1),
    )..repeat();

    return AnimatedBuilder(
        animation: controller,
        builder: (context, _) {
          final currentDateTime = DateTime.now();
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(timeFormat.format(currentDateTime)),
              Text(dateFormat.format(currentDateTime)),
            ],
          );
        });
  }
}
