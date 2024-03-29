import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar/vertical_sub_menu.dart';
import 'package:amdiaz/presentation/my_resume_app.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../../../application/engine_mode/engine_mode_bloc.dart';

class VerticalMainMenu extends StatelessWidget {
  final bool isOpen;
  const VerticalMainMenu({
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
      child: Stack(
        alignment: AlignmentDirectional.bottomStart,
        children: [
          Positioned(
            bottom: 0,
            left: 50,
            width: 250,
            height: 600,
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
                ListTile(
                  leading: const FaIcon(FontAwesomeIcons.blog),
                  title: Text(
                    'Blog',
                    style: Theme.of(context).textTheme.button,
                  ),
                  onTap: () =>
                      Navigator.pushNamed(navigator.currentContext!, '/blog'),
                ),
              ],
            ),
          ),
          const VerticalSubMenu(
            width: 50,
          ),
        ],
      ),
    );
  }
}
