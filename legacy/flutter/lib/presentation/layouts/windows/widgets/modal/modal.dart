import 'package:flutter/material.dart';

import '../popup_options_bar.dart';

class Modal extends StatelessWidget {
  final void Function() onToggleExpand;
  final void Function() onMinimize;
  final void Function() onClose;
  final Widget child;
  const Modal({
    Key? key,
    required this.onToggleExpand,
    required this.onMinimize,
    required this.onClose,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      margin: const EdgeInsets.all(20),
      elevation: 8,
      child: Column(
        children: [
          PopupOptionsBar(
            onClose: onClose,
            onMinimize: onMinimize,
            onToggleExpand: onToggleExpand,
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
    );
  }
}
