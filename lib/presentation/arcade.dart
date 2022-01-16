import 'package:flutter/material.dart';

import '../shared/values/image_path.dart';
import 'shared/widgets/terminal.dart';

class Arcade extends StatelessWidget {
  const Arcade({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FittedBox(
      fit: BoxFit.fitWidth,
      child: SizedBox(
        width: 900,
        height: 900,
        child: Stack(
          children: [
            const Image(
              image: AssetImage(ImagePath.arcade),
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
            Positioned(
              top: 222,
              left: 188,
              width: 490,
              height: 378,
              child: Transform(
                transform: Matrix4.identity()
                  ..setEntry(3, 2, 0.0008)
                  ..rotateX(-.35),
                alignment: FractionalOffset.center,
                child: const Terminal(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
