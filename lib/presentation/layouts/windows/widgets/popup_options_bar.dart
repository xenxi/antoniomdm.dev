import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../shared/components/launcher_funtions.dart';

class PopupOptionsBar extends StatelessWidget {
  final Function() onToggleExpand;
  final Function() onMinimize;
  final Function() onClose;
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
          TextButton.icon(
              style: TextButton.styleFrom(
                primary: Colors.white,
              ),
              onPressed: () => openUrl('https://github.com/xenxi'),
              icon: const FaIcon(FontAwesomeIcons.github),
              label: const Text('C:/github/xenxi.exe')),
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
}
