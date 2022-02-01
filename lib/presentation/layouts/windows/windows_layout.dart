import 'package:amdiaz/presentation/layouts/windows/widgets/popup_options_bar.dart';
import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar.dart';
import 'package:amdiaz/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../application/engine_mode/engine_mode_bloc.dart';

class WindowsLayout extends HookWidget {
  final Widget child;
  const WindowsLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final iconOffset = useState<Offset>(const Offset(20, 20));
    final modalOffset = useState<Offset>(const Offset(50, 100));
    return Scaffold(
      body: Overlay(
        initialEntries: [
          OverlayEntry(builder: (context) {
            return Stack(
              children: [
                const SizedBox.expand(
                  child: Image(
                      image: AssetImage(ImagePath.bg7), fit: BoxFit.cover),
                ),
                _buildDraggableDesktopIcon(context, offset: iconOffset),
                _buildDraggableModalWindows(offset: modalOffset),
                const Align(
                  alignment: Alignment.bottomCenter,
                  child: WindowsNavigationBar(),
                ),
              ],
            );
          }),
        ],
      ),
    );
  }

  Widget _buildDraggableModalWindows({required ValueNotifier<Offset> offset}) =>
      Positioned(
        top: offset.value.dy,
        left: offset.value.dx,
        child: Draggable(
          data: 'desktop',
          feedback: _buildModalWindows(),
          onDragEnd: (details) => offset.value = details.offset,
          childWhenDragging: Opacity(
            opacity: .4,
            child: _buildModalWindows(),
          ),
          child: _buildModalWindows(),
        ),
      );
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
  Widget _buildDraggableDesktopIcon(BuildContext context,
          {required ValueNotifier<Offset> offset}) =>
      Positioned(
        top: offset.value.dy,
        left: offset.value.dx,
        child: Column(
          children: [
            Draggable(
              data: 'desktop',
              feedback: _buildDesktopIcon(context),
              onDragEnd: (details) => offset.value = details.offset,
              childWhenDragging: Opacity(
                opacity: .4,
                child: _buildDesktopIcon(context),
              ),
              child: _buildDesktopIcon(context),
            ),
          ],
        ),
      );
  Widget _buildDesktopIcon(BuildContext context) => InkWell(
        onTap: () {
          final bloc = BlocProvider.of<EngineModeBloc>(context)
            ..add(ArcadeEngineModeSelected());
          Future.delayed(const Duration(milliseconds: 500),
              () => bloc.add(PlayBackgroundMusicSelected()));
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: const [
            FaIcon(FontAwesomeIcons.gamepad),
            SizedBox(
              height: 6,
            ),
            Text('Arcade Mode')
          ],
        ),
      );
}
