import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';

class Shutdown extends StatelessWidget {
  const Shutdown({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FadeIn(
      child: Container(
        height: double.infinity,
        width: double.infinity,
        color: Theme.of(context).cardColor,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: const [
            SizedBox(
                width: 46,
                height: 46,
                child: CircularProgressIndicator(color: Colors.white)),
            SizedBox(height: 14),
            Text(
              'Apagando',
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
