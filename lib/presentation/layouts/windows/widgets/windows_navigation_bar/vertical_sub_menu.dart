import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar/sub_menu_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../../../application/engine_mode/engine_mode_bloc.dart';

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
      decoration: const BoxDecoration(color: Color.fromRGBO(43, 43, 43, 1)),
      duration: const Duration(milliseconds: 600),
      curve: Curves.fastLinearToSlowEaseIn,
      clipBehavior: Clip.hardEdge,
      width: isExpanded.value ? width + 120 : width,
      child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            SubMenuButton(
              showText: isExpanded.value,
              width: width,
              icon: Icons.menu,
              text: 'Inicio',
              highlighted: true,
              onTap: () => isExpanded.value = !isExpanded.value,
              onHover: (val) {
                if (val) isExpanded.value = true;
              },
            ),
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
              onTap: () => BlocProvider.of<EngineModeBloc>(context)
                  .add(TurnOffSelected()),
            ),
          ]),
    );
  }
}
