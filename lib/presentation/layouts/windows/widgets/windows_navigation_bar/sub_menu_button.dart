import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SubMenuButton extends StatelessWidget {
  final void Function()? onTap;
  final void Function(bool val)? onHover;
  final bool showText;
  final double width;
  final String text;
  final IconData icon;
  final bool highlighted;
  const SubMenuButton({
    Key? key,
    this.onTap,
    this.onHover,
    required this.showText,
    required this.width,
    required this.text,
    required this.icon,
    this.highlighted = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onHover: onHover,
        onTap: onTap,
        child: Row(
          children: [
            SizedBox(
                height: width,
                width: width,
                child: Center(child: FaIcon(icon, size: 20))),
            if (showText)
              Text(
                highlighted ? text.toUpperCase() : text,
                style: Theme.of(context).textTheme.caption!.copyWith(
                      color: highlighted ? Colors.white : Colors.white54,
                      fontWeight:
                          highlighted ? FontWeight.bold : FontWeight.normal,
                    ),
              ),
          ],
        ),
      ),
    );
  }
}
