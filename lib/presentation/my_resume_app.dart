import 'package:amdiaz/infrastructure/just_audio_music_player.dart';
import 'package:amdiaz/presentation/core/routes/fluro_route_generator.dart';
import 'package:amdiaz/presentation/shared/widgets/error_container.dart';
import 'package:amdiaz/shared/values/location.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:just_audio/just_audio.dart';

import '../application/engine_mode/engine_mode_bloc.dart';
import 'core/custom_theme.dart';
import 'layouts/arcade/arcade_layout.dart';
import 'layouts/windows/windows_layout.dart';

final navigator = GlobalKey<NavigatorState>();

class MyResumeApp extends StatelessWidget {
  final FluroRouteGenerator _routeGenerator = FluroRouteGenerator();
  MyResumeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engineModeBloc = EngineModeBloc(JustAudioMusicPlayer(AudioPlayer()));

    return BlocProvider(
      create: (context) => engineModeBloc,
      child: MaterialApp(
          navigatorKey: navigator,
          title: Location.fullName,
          theme: CustomTheme.light,
          onGenerateRoute: _routeGenerator.generateRoute,
          builder: (context, child) {
            return _buildLayout(child);
          }),
    );
  }

  BlocBuilder<EngineModeBloc, EngineModeState> _buildLayout(Widget? child) {
    final nullSafeChild = child ?? const ErrorContainer();
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
