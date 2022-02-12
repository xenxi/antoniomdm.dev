import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../shared/components/launcher_funtions.dart';

class PopupOptionsBar extends StatelessWidget {
  final void Function() onToggleExpand;
  final void Function() onMinimize;
  final void Function() onClose;
  const PopupOptionsBar({
    Key? key,
    required this.onToggleExpand,
    required this.onMinimize,
    required this.onClose,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 60,
      color: Theme.of(context).primaryColor,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      margin: const EdgeInsets.only(
        bottom: 20,
      ),
      child: Row(
        children: [
          _buildDescriptionIcon(context),
          const Spacer(),
          IconButton(
              onPressed: onMinimize, icon: const Icon(Icons.minimize_outlined)),
          IconButton(
              onPressed: onToggleExpand,
              icon: const Icon(Icons.fullscreen_outlined)),
          IconButton(
              onPressed: onClose, icon: const Icon(Icons.close_outlined)),
        ],
      ),
    );
  }

  Widget _buildDescriptionIcon(BuildContext context) {
    const icon = FaIcon(FontAwesomeIcons.github);
    return MediaQuery.of(context).size.width < 390
        ? IconButton(onPressed: _openGithub, icon: icon)
        : TextButton.icon(
            style: TextButton.styleFrom(
              primary: Colors.white,
            ),
            onPressed: _openGithub,
            icon: icon,
            label: const Text('C:/github/xenxi.exe'));
  }

  void _openGithub() => openUrl('https://github.com/xenxi');
}
