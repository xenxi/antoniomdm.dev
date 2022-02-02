import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class DesktopIcon extends StatelessWidget {
  final void Function() onTap;
  final IconData icon;
  final String text;
  const DesktopIcon({
    Key? key,
    required this.onTap,
    required this.icon,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          FaIcon(icon),
          const SizedBox(
            height: 6,
          ),
          Text(text)
        ],
      ),
    );
  }
}
