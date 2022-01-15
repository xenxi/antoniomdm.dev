import 'package:flutter/material.dart';

import '../shared/values/image_path.dart';
import 'terminal.dart';

class Arcade extends StatelessWidget {
  const Arcade({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FittedBox(
      child: Stack(
        children: [
          const Image(
            image: AssetImage(ImagePath.arcade),
            fit: BoxFit.fitWidth,
            alignment: Alignment.center,
          ),
          Positioned(
            top: 420,
            left: 340,
            width: 890,
            height: 650,
            child: Transform(
              transform: Matrix4.identity()
                ..setEntry(3, 2, 0.001)
                ..rotateX(-.15),
              alignment: FractionalOffset.center,
              child: const Terminal(),
            ),
          )
        ],
      ),
    );
  }
}
