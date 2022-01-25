import 'package:amdiaz/infrastructure/just_audio_music_player.dart';
import 'package:amdiaz/presentation/core/routes/fluro_route_generator.dart';
import 'package:amdiaz/shared/values/location.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../application/engine_mode/engine_mode_bloc.dart';
import 'core/custom_theme.dart';
import 'layouts/arcade/arcade_layout.dart';
import 'layouts/terminal/terminal_layout.dart';

class MyResumeApp extends StatelessWidget {
  final FluroRouteGenerator _routeGenerator = FluroRouteGenerator();
  MyResumeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engineModeBloc = EngineModeBloc(JustAudioMusicPlayer());

    return BlocProvider(
      create: (context) => engineModeBloc,
      child: MaterialApp(
          title: Location.fullName,
          theme: CustomTheme.light,
          onGenerateRoute: _routeGenerator.generateRoute,
          builder: (_, child) {
            return BlocBuilder<EngineModeBloc, EngineModeState>(
              builder: (context, state) {
                switch (state.engine) {
                  case Engine.arcade:
                    return ArcadeLayout(
                        child: child ??
                            const Center(
                              child: Text('ERROR'),
                            ));
                  case Engine.windows:
                    return TerminalLayout(
                        child: child ??
                            const Center(
                              child: Text('ERROR'),
                            ));
                }
              },
            );
          }),
    );
  }
}
