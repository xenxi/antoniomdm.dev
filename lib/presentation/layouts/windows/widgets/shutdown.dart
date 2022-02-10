import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';

class Shutdown extends StatelessWidget {
  const Shutdown({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FadeIn(
      child: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            color: Theme.of(context).cardColor,
            child: ZoomOut(
              duration: const Duration(milliseconds: 300),
              delay: const Duration(milliseconds: 4700),
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
          ),
          FadeIn(
            delay: const Duration(seconds: 5),
            child: Container(
              height: double.infinity,
              width: double.infinity,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
