import 'package:amdiaz/presentation/layouts/windows/widgets/windows_navigation_bar/windows_navigation_bar.dart';
import 'package:amdiaz/presentation/shared/widgets/draggable_container.dart';
import 'package:amdiaz/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../application/engine_mode/engine_mode_bloc.dart';
import 'widgets/desktop_icon.dart';
import 'widgets/shutdown.dart';
import 'widgets/windows_modal.dart';

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
    final duration = useState(Duration.zero);
    final modalOffset = useState<Offset>(Offset(
        (currentSize.width / 2) - (modalSize.width / 2),
        (currentSize.height / 2) - (modalSize.height / 2)));
    return Scaffold(
      body: BlocBuilder<EngineModeBloc, EngineModeState>(
        builder: (context, state) {
          return Stack(
            children: [
              const SizedBox.expand(
                child:
                    Image(image: AssetImage(ImagePath.bg7), fit: BoxFit.cover),
              ),
              Positioned(
                top: iconOffset.value.dy,
                left: iconOffset.value.dx,
                child: DraggableContainer(
                  feedback: _buildDesktopIconFeedback(context),
                  onDragEnd: (details) => iconOffset.value = details.offset,
                  child: _buildDesktopIcon(context),
                ),
              ),
              _buildDraggableModalWindows(context,
                  offset: modalOffset,
                  duration: duration,
                  modalExpanded: modalExpanded,
                  modalMinimized: modalMinimized),
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
  }

  Widget _buildDraggableModalWindows(BuildContext context,
      {required ValueNotifier<Offset> offset,
      required ValueNotifier<bool> modalExpanded,
      required ValueNotifier<Duration> duration,
      required ValueNotifier<bool> modalMinimized}) {
    final modalSize =
        _calculeSize(modalMinimized.value, modalExpanded.value, context);
    return AnimatedPositioned(
      duration: duration.value,
      curve: Curves.easeInOut,
      onEnd: () => duration.value = Duration.zero,
      top: modalExpanded.value ? 0 : offset.value.dy,
      left: modalExpanded.value ? 0 : offset.value.dx,
      child: DraggableContainer(
          feedback: _buildModalWindows(context,
              size: modalSize,
              duration: duration,
              modalExpanded: modalExpanded,
              modalMinimized: modalMinimized),
          onDragEnd: (details) => offset.value = details.offset,
          child: _buildModalWindows(context,
              size: modalSize,
              duration: duration,
              modalExpanded: modalExpanded,
              modalMinimized: modalMinimized,
              child: child)),
    );
  }

  Widget _buildModalWindows(BuildContext context,
          {required Size size,
          required ValueNotifier<bool> modalExpanded,
          required ValueNotifier<Duration> duration,
          required ValueNotifier<bool> modalMinimized,
          Widget? child}) =>
      FittedBox(
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 800),
          curve: Curves.elasticInOut,
          height: size.height,
          width: size.width,
          child: WindowsModal(
            onClose: () => modalMinimized.value = !modalMinimized.value,
            onMinimize: () => modalMinimized.value = !modalMinimized.value,
            onToggleExpand: () {
              duration.value = const Duration(milliseconds: 600);
              modalExpanded.value = !modalExpanded.value;
            },
            child: child ?? Container(),
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

  Widget _buildDesktopIcon(BuildContext context) => DesktopIcon(
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
  Widget _buildDesktopIconFeedback(BuildContext context) => const DesktopIcon(
        icon: FontAwesomeIcons.gamepad,
        text: 'Arcade Mode',
      );
}
