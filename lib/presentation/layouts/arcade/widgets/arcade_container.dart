import 'package:amdiaz/presentation/layouts/arcade/widgets/arcade_button.dart';
import 'package:flutter/material.dart';

import '../../../../shared/values/image_path.dart';
import '../../../shared/widgets/terminal_container.dart';

class ArcadeContainer extends StatelessWidget {
  final Widget child;
  const ArcadeContainer({
    required this.child,
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
              image: AssetImage(ImagePath.arcadeWithoutButtons),
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
            ..._buildLeftGamePad(230),
            ..._buildRightGamePad(570),
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
                child: TerminalContainer(child: child),
              ),
            )
          ],
        ),
      ),
    );
  }

  List<Widget> _buildLeftGamePad(double left) => [
        Positioned(
          bottom: 220,
          left: left,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 220,
          left: left + 60,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 220,
          left: left + 60 + 60,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left - 10,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left + 60 - 10,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left + 60 + 60 - 10,
          child: const ArcadeButton(),
        ),
      ];
  List<Widget> _buildRightGamePad(double left) => [
        Positioned(
          bottom: 220,
          left: left - 10,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 220,
          left: left + 60 - 10,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 220,
          left: left + 60 + 60 - 10,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left + 60,
          child: const ArcadeButton(),
        ),
        Positioned(
          bottom: 200,
          left: left + 60 + 60,
          child: const ArcadeButton(),
        ),
      ];
}
