import 'package:amdiaz/presentation/layouts/windows/widgets/popup_options_bar.dart';
import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar.dart';
import 'package:amdiaz/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../application/engine_mode/engine_mode_bloc.dart';

class WindowsLayout extends StatelessWidget {
  final Widget child;
  const WindowsLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const SizedBox.expand(
            child: Image(image: AssetImage(ImagePath.bg7), fit: BoxFit.cover),
          ),
          Positioned(top: 20, left: 20, child: _buildDesktopIcon(context)),
          Align(
            alignment: Alignment.center,
            child: _buildModalWindows(),
          ),
          const Align(
            alignment: Alignment.bottomCenter,
            child: WindowsNavigationBar(),
          ),
        ],
      ),
    );
  }

  Widget _buildModalWindows() => FittedBox(
        child: SizedBox(
          height: 500,
          width: 600,
          child: Card(
            clipBehavior: Clip.antiAlias,
            margin: const EdgeInsets.all(20),
            elevation: 8,
            child: Column(
              children: [
                const PopupOptionsBar(),
                Expanded(child: child),
                const SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
        ),
      );

  Widget _buildDesktopIcon(BuildContext context) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          IconButton(
              onPressed: () {
                final bloc = BlocProvider.of<EngineModeBloc>(context)
                  ..add(ArcadeEngineModeSelected());
                Future.delayed(const Duration(milliseconds: 500),
                    () => bloc.add(PlayBackgroundMusicSelected()));
              },
              icon: const FaIcon(FontAwesomeIcons.gamepad)),
          const Text('Arcade Mode')
        ],
      );
}
