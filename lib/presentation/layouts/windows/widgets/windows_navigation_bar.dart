import 'package:amdiaz/presentation/core/custom_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../../application/engine_mode/engine_mode_bloc.dart';
import 'clock.dart';

class WindowsNavigationBar extends HookWidget {
  const WindowsNavigationBar({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isOpen = useState(false);
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _WindowsNavigationBarMenu(isOpen: isOpen.value),
        _buildMenuBar(context, isOpen: isOpen),
      ],
    );
  }

  Widget _buildMenuBar(BuildContext context,
      {required ValueNotifier<bool> isOpen}) {
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
          _WindowsButton(onPressed: () {
            print('clicked: ${isOpen.value}');
            isOpen.value = !isOpen.value;
          }),
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

class _WindowsButton extends StatelessWidget {
  final void Function() onPressed;
  const _WindowsButton({
    Key? key,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      width: 50,
      child: IconButton(
          onPressed: onPressed, icon: const FaIcon(FontAwesomeIcons.windows)),
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
      width: 300,
      color: Theme.of(context).primaryColor,
      child: Row(
        children: [
          SizedBox(
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
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.only(top: 10),
              children: [
                ListTile(
                  leading: const FaIcon(FontAwesomeIcons.gamepad),
                  title: Text(
                    'Arcade Mode',
                    style: Theme.of(context).textTheme.button,
                  ),
                  onTap: () => BlocProvider.of<EngineModeBloc>(context)
                      .add(ArcadeEngineModeSelected()),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
