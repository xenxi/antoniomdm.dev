import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'clock.dart';

class WindowsNavigationBar extends StatelessWidget {
  const WindowsNavigationBar({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 50,
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor,
        borderRadius: const BorderRadius.all(Radius.circular(2)),
        border: Border.all(color: Colors.grey, width: .2),
      ),
      child: Row(
        children: [
          SizedBox(
            height: 50,
            width: 50,
            child: IconButton(
                onPressed: () {}, icon: const FaIcon(FontAwesomeIcons.windows)),
          ),
          Container(
            height: 50,
            width: 50,
            decoration: BoxDecoration(
                color: Colors.white.withOpacity(.1),
                border: const Border(
                  bottom: BorderSide(
                    color: Colors.white,
                    width: .6,
                  ),
                )),
            child: IconButton(
                onPressed: () {}, icon: const FaIcon(FontAwesomeIcons.github)),
          ),
          const Spacer(),
          const SizedBox(
            height: 50,
            child: Clock(),
          ),
          const VerticalDivider()
        ],
      ),
    );
  }
}
