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
    final modalExpanded = useState(false);
    final modalMinimized = useState(false);
    final currentSize = MediaQuery.of(context).size;
    final modalSize =
        _calculeSize(modalMinimized.value, modalExpanded.value, context);
    final modalOffset = useState<Offset>(Offset(
        (currentSize.width / 2) - (modalSize.width / 2),
        (currentSize.height / 2) - (modalSize.height / 2)));
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
                _buildDraggableModalWindows(context,
                    offset: modalOffset,
                    modalExpanded: modalExpanded,
                    modalMinimized: modalMinimized),
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

  Widget _buildDraggableModalWindows(BuildContext context,
      {required ValueNotifier<Offset> offset,
      required ValueNotifier<bool> modalExpanded,
      required ValueNotifier<bool> modalMinimized}) {
    final modalSize =
        _calculeSize(modalMinimized.value, modalExpanded.value, context);
    return AnimatedPositioned(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
      top: modalExpanded.value ? 0 : offset.value.dy,
      left: modalExpanded.value ? 0 : offset.value.dx,
      child: Draggable(
        data: 'modal',
        feedback: _buildModalWindows(context,
            size: modalSize,
            modalExpanded: modalExpanded,
            modalMinimized: modalMinimized),
        onDragEnd: (details) => offset.value = details.offset,
        childWhenDragging: Opacity(
          opacity: .4,
          child: _buildModalWindows(context,
              size: modalSize,
              modalExpanded: modalExpanded,
              modalMinimized: modalMinimized),
        ),
        child: _buildModalWindows(context,
            size: modalSize,
            modalExpanded: modalExpanded,
            modalMinimized: modalMinimized),
      ),
    );
  }

  Widget _buildModalWindows(BuildContext context,
          {required Size size,
          required ValueNotifier<bool> modalExpanded,
          required ValueNotifier<bool> modalMinimized}) =>
      FittedBox(
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 800),
          curve: Curves.elasticInOut,
          height: size.height,
          width: size.width,
          child: Card(
            clipBehavior: Clip.antiAlias,
            margin: const EdgeInsets.all(20),
            elevation: 8,
            child: Column(
              children: [
                PopupOptionsBar(
                  onClose: () => modalMinimized.value = !modalMinimized.value,
                  onMinimize: () =>
                      modalMinimized.value = !modalMinimized.value,
                  onToggleExpand: () =>
                      modalExpanded.value = !modalExpanded.value,
                ),
                Expanded(
                    child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: child,
                )),
                const SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
        ),
      );

  Size _calculeSize(
      bool modalMinimized, bool modalExpanded, BuildContext context) {
    if (modalMinimized) return Size.zero;

    final currentSize = MediaQuery.of(context).size;
    if (modalExpanded) {
      return Size(currentSize.width, currentSize.height - 50);
    }
    return Size(600 > currentSize.width - 20 ? currentSize.width - 20 : 600,
        500 > currentSize.height - 50 ? currentSize.height - 50 : 500);
  }

  Widget _buildDraggableDesktopIcon(BuildContext context,
          {required ValueNotifier<Offset> offset}) =>
      Positioned(
        top: offset.value.dy,
        left: offset.value.dx,
        child: Draggable(
          data: 'desktop',
          feedback: _buildDesktopIcon(context),
          onDragEnd: (details) => offset.value = details.offset,
          childWhenDragging: Opacity(
            opacity: .4,
            child: _buildDesktopIcon(context),
          ),
          child: _buildDesktopIcon(context),
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
