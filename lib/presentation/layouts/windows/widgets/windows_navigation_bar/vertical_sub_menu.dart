import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class VerticalSubMenu extends StatelessWidget {
  const VerticalSubMenu({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 49.5,
      child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.menu),
        ),
        const Spacer(),
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.settings),
        ),
        IconButton(
          onPressed: () {},
          icon: FaIcon(FontAwesomeIcons.images),
        ),
        IconButton(
          onPressed: () {},
          icon: FaIcon(FontAwesomeIcons.xbox),
        ),
        IconButton(
          onPressed: () {},
          icon: FaIcon(FontAwesomeIcons.powerOff),
        ),
      ]),
    );
  }
}
