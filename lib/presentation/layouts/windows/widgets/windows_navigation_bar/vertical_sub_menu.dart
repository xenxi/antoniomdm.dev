import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar/sub_menu_button.dart';
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
      curve: Curves.fastLinearToSlowEaseIn,
      clipBehavior: Clip.hardEdge,
      width: isExpanded.value ? width + 140 : width,
      child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            SubMenuButton(
                showText: isExpanded.value,
                width: width,
                icon: Icons.menu,
                text: 'INICIO',
                onTap: () => isExpanded.value = !isExpanded.value),
            const Spacer(),
            SubMenuButton(
              showText: isExpanded.value,
              width: width,
              icon: Icons.settings,
              text: 'Configuración',
            ),
            SubMenuButton(
              showText: isExpanded.value,
              width: width,
              icon: FontAwesomeIcons.images,
              text: 'Imágenes',
            ),
            SubMenuButton(
              showText: isExpanded.value,
              width: width,
              icon: FontAwesomeIcons.xbox,
              text: 'Juegos',
            ),
            SubMenuButton(
              showText: isExpanded.value,
              width: width,
              icon: FontAwesomeIcons.powerOff,
              text: 'Apagado',
            ),
          ]),
    );
  }
}
