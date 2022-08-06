import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar/windows_navigation_bar.dart';
import 'package:amdiaz/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../application/engine_mode/engine_mode_bloc.dart';
import 'widgets/desktop_icon/draggable_desktop_icon.dart';
import 'widgets/shutdown.dart';
import 'widgets/modal/draggable_modal.dart';

class WindowsLayout extends StatelessWidget {
  final Widget child;
  const WindowsLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        body: BlocBuilder<EngineModeBloc, EngineModeState>(
          builder: (context, state) {
            return Stack(
              children: [
                const SizedBox.expand(
                  child: Image(
                      image: AssetImage(ImagePath.bg7), fit: BoxFit.cover),
                ),
                _buildDesktopIcon(context),
                _buildBlogDesktopIcon(context),
                DraggableModal(child: child),
                const Align(
                  alignment: Alignment.bottomCenter,
                  child: WindowsNavigationBar(),
                ),
                if (!state.isOn) const Shutdown(),
              ],
            );
          },
        ),
      );

  Widget _buildBlogDesktopIcon(BuildContext context) => DraggableDesktopIcon(
        icon: FontAwesomeIcons.blog,
        text: 'Blog',
        initialPosition: const Offset(50, 90),
        onTap: () {
          final bloc = BlocProvider.of<EngineModeBloc>(context)
            ..add(ArcadeEngineModeSelected());

          bloc.state.playingBackgroundMusicOption.fold(
              () => Future.delayed(const Duration(milliseconds: 500),
                  () => bloc.add(PlayBackgroundMusicSelected())),
              (_) {});
        },
      );
  Widget _buildDesktopIcon(BuildContext context) => DraggableDesktopIcon(
        icon: FontAwesomeIcons.gamepad,
        text: 'Arcade Mode',
        onTap: () {
          final bloc = BlocProvider.of<EngineModeBloc>(context)
            ..add(ArcadeEngineModeSelected());

          bloc.state.playingBackgroundMusicOption.fold(
              () => Future.delayed(const Duration(milliseconds: 500),
                  () => bloc.add(PlayBackgroundMusicSelected())),
              (_) {});
        },
      );
}
