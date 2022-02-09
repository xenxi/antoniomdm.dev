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
