import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Clock extends StatelessWidget {
  static final DateFormat timeFormat = DateFormat('kk:mm');
  static final DateFormat dateFormat = DateFormat('dd/MM/yyyy');
  const Clock({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final currentDateTime = DateTime.now();

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(timeFormat.format(currentDateTime)),
        Text(dateFormat.format(currentDateTime)),
      ],
    );
  }
}
