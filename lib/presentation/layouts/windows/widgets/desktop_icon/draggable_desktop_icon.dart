import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../../../../shared/widgets/draggable_container.dart';
import 'desktop_icon.dart';

class DraggableDesktopIcon extends HookWidget {
  final void Function()? onTap;
  final IconData icon;
  final String text;
  const DraggableDesktopIcon({
    Key? key,
    this.onTap,
    required this.icon,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final iconOffset = useState<Offset>(const Offset(20, 20));
    return Positioned(
      top: iconOffset.value.dy,
      left: iconOffset.value.dx,
      child: DraggableContainer(
        feedback: _buildFeedback(context),
        onDragEnd: (details) => iconOffset.value = details.offset,
        child: _buildIcon(context),
      ),
    );
  }

  Widget _buildIcon(BuildContext context) => DesktopIcon(
        icon: icon,
        text: text,
        onTap: onTap,
      );
  Widget _buildFeedback(BuildContext context) => DesktopIcon(
        icon: icon,
        text: text,
      );
}
