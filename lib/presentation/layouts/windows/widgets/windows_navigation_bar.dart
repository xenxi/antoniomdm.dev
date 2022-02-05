import 'package:amdiaz/presentation/core/custom_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'clock.dart';

class WindowsNavigationBar extends StatelessWidget {
  final void Function() onPressed;
  const WindowsNavigationBar({
    Key? key,
    required this.onPressed,
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
      child: _buildMenuBar(),
    );
  }

  Row _buildMenuBar() {
    return Row(
      children: [
        const _WindowsButton(),
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
    );
  }
}

class _WindowsButton extends HookWidget {
  const _WindowsButton({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isOpen = useState(false);
    return Stack(
      clipBehavior: Clip.none,
      children: [
        SizedBox(
          height: 50,
          width: 50,
          child: IconButton(
              onPressed: () => isOpen.value = !isOpen.value,
              icon: const FaIcon(FontAwesomeIcons.windows)),
        ),
        Positioned(
            child: _WindowsNavigationBarMenu(isOpen: isOpen.value),
            left: 0,
            bottom: 50)
      ],
    );
  }
}

class _WindowsNavigationBarMenu extends StatelessWidget {
  final bool isOpen;
  const _WindowsNavigationBarMenu({
    Key? key,
    required this.isOpen,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 400),
      height: isOpen ? 600 : 0,
      curve: Curves.fastLinearToSlowEaseIn,
      width: 400,
      color: Theme.of(context).primaryColor,
    );
  }
}
