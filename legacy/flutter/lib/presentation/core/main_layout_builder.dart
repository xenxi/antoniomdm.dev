import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../application/engine_mode/engine_mode_bloc.dart';
import '../layouts/arcade/arcade_layout.dart';
import '../layouts/windows/windows_layout.dart';
import '../shared/widgets/error_container.dart';

class MainLayoutBuilder extends StatelessWidget {
  const MainLayoutBuilder({
    Key? key,
    this.child,
  }) : super(key: key);

  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final nullSafeChild = child ?? const ErrorContainer();
    return Overlay(
      initialEntries: [
        OverlayEntry(builder: (context) => _buildSelectedLayout(nullSafeChild)),
      ],
    );
  }

  BlocBuilder<EngineModeBloc, EngineModeState> _buildSelectedLayout(
      Widget nullSafeChild) {
    return BlocBuilder<EngineModeBloc, EngineModeState>(
      builder: (context, state) {
        switch (state.engine) {
          case Engine.arcade:
            return ArcadeLayout(child: nullSafeChild);
          case Engine.windows:
            return WindowsLayout(child: nullSafeChild);
        }
      },
    );
  }
}
