import 'package:flutter/material.dart';

class DraggableContainer extends StatelessWidget {
  final Widget child;
  final Widget feedback;
  final DragEndCallback? onDragEnd;
  const DraggableContainer({
    Key? key,
    required this.child,
    required this.feedback,
    this.onDragEnd,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Draggable(
      // childWhenDragging: child,
      onDragEnd: onDragEnd,
      feedback: Opacity(
        opacity: .5,
        child: feedback,
      ),
      child: child,
    );
  }
}
