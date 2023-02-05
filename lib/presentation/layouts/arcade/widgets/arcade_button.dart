import 'package:amdiaz/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class ArcadeButton extends HookWidget {
  const ArcadeButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final pressed = useState(false);
    return MouseRegion(
      onEnter: (_) => pressed.value = true,
      onExit: (_) => pressed.value = false,
      child: SizedBox(
        width: 50,
        child: Image.asset(
            pressed.value
                ? ImagePath.arcadeButtonPressed
                : ImagePath.arcadeButton,
            alignment: Alignment.center,
            fit: BoxFit.fitWidth),
      ),
    );
  }
}
