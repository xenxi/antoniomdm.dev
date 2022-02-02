import 'package:flutter/material.dart';

class DraggableContainer extends StatelessWidget {
  final Widget child;
  final DragEndCallback? onDragEnd;
  const DraggableContainer({
    Key? key,
    required this.child,
    this.onDragEnd,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Draggable(
      childWhenDragging: child,
      onDragEnd: onDragEnd,
      feedback: Opacity(
        opacity: .5,
        child: child,
      ),
      child: child,
    );
  }
}
