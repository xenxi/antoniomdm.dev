import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../shared/widgets/draggable_container.dart';

class DesktopIcon extends HookWidget {
  final void Function()? onTap;
  final IconData icon;
  final String text;
  const DesktopIcon({
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

  Widget _buildIcon(BuildContext context) => _DesktopIcon(
        icon: icon,
        text: text,
        onTap: onTap,
      );
  Widget _buildFeedback(BuildContext context) => _DesktopIcon(
        icon: icon,
        text: text,
      );
}

class _DesktopIcon extends StatelessWidget {
  final void Function()? onTap;
  final IconData icon;
  final String text;
  const _DesktopIcon({
    Key? key,
    this.onTap,
    required this.icon,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (onTap == null) {
      return _buildIcon(context);
    }
    return InkWell(
      onTap: onTap,
      child: _buildIcon(context),
    );
  }

  Widget _buildIcon(BuildContext context) => SizedBox(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            FaIcon(icon),
            const SizedBox(
              height: 6,
            ),
            Text(
              text,
              style: Theme.of(context).textTheme.button,
            )
          ],
        ),
      );
}
