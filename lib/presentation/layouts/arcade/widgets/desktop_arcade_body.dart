import 'package:flutter/cupertino.dart';

import '../../../../shared/widgets/neon_text.dart';

class DesktopArcadeBody extends StatelessWidget {
  final Widget child;

  const DesktopArcadeBody({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        const Spacer(),
        const NeonText('Hello World', fontSize: 120),
        const Spacer(),
        Expanded(
          flex: 10,
          child: Align(
            alignment: Alignment.bottomCenter,
            child:
                Transform.translate(offset: const Offset(0, 50), child: child),
          ),
        ),
      ],
    );
  }
}
