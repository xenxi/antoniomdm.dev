import 'package:flutter/material.dart';

class TerminalLayout extends StatelessWidget {
  final Widget child;
  const TerminalLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: child,
      ),
    );
  }
}
