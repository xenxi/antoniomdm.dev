import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../../../../shared/widgets/draggable_container.dart';
import 'modal.dart';

class WindowsModal extends HookWidget {
  const WindowsModal({
    Key? key,
    required this.child,
  }) : super(key: key);
  final Widget child;
  @override
  Widget build(BuildContext context) {
    final modalExpanded = useState(false);
    final modalMinimized = useState(false);
    final currentSize = MediaQuery.of(context).size;
    final modalSize =
        _calculeSize(modalMinimized.value, modalExpanded.value, context);
    final duration = useState(Duration.zero);
    final modalOffset = useState<Offset>(Offset(
        (currentSize.width / 2) - (modalSize.width / 2),
        (currentSize.height / 2) - (modalSize.height / 2)));

    return _buildDraggableModalWindows(context,
        offset: modalOffset,
        duration: duration,
        modalExpanded: modalExpanded,
        modalMinimized: modalMinimized);
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
}

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
        child: Modal(
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
