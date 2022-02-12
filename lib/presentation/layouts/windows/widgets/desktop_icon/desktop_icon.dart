import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class DesktopIcon extends StatelessWidget {
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
