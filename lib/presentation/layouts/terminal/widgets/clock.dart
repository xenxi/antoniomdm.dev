import 'package:flutter/material.dart';

class Clock extends StatelessWidget {
  const Clock({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: const [
        Text('8:00'),
        Text('20/01/2022'),
      ],
    );
  }
}
