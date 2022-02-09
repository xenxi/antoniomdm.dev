import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class VerticalSubMenu extends HookWidget {
  final double width;
  const VerticalSubMenu({
    Key? key,
    required this.width,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isExpanded = useState(false);
    return AnimatedContainer(
      decoration:
          BoxDecoration(color: Theme.of(context).cardColor.withOpacity(.3)),
      duration: const Duration(milliseconds: 600),
      curve: Curves.slowMiddle,
      clipBehavior: Clip.hardEdge,
      width: isExpanded.value ? width * 3 : width,
      child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: InkWell(
                // onHover: (val) => isExpanded.value = val,
                onTap: () => isExpanded.value = !isExpanded.value,
                child: Row(
                  children: [
                    SizedBox(
                        width: width,
                        child: const Center(child: Icon(Icons.menu, size: 20))),
                    const Text('INICIO')
                  ],
                ),
              ),
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
