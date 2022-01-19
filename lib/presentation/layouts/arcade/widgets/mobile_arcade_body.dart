import 'package:flutter/cupertino.dart';

import '../../../../shared/widgets/neon_text.dart';

class MobileArcadeBody extends StatelessWidget {
  final Widget child;
  final double maxWidth;
  const MobileArcadeBody({
    Key? key,
    required this.child,
    required this.maxWidth,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        const Spacer(),
        const NeonText('Hello World', fontSize: 80),
        const Spacer(
          flex: 2,
        ),
        Transform.scale(
            scale: 1.25,
            origin: Offset(-35, maxWidth < 350 ? 50 : 140),
            alignment: Alignment.center,
            child: child),
      ],
    );
  }
}
