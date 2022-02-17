import 'package:amdiaz/infrastructure/just_audio_music_player.dart';
import 'package:amdiaz/presentation/core/routes/fluro_route_generator.dart';
import 'package:amdiaz/shared/values/location.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:just_audio/just_audio.dart';

import '../application/engine_mode/engine_mode_bloc.dart';
import 'core/custom_theme.dart';
import 'core/main_layout_builder.dart';

final navigator = GlobalKey<NavigatorState>();

class MyResumeApp extends StatelessWidget {
  final FluroRouteGenerator _routeGenerator = FluroRouteGenerator();
  MyResumeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final engineModeBloc = EngineModeBloc(JustAudioMusicPlayer(AudioPlayer()));

    return MaterialApp(
        navigatorKey: navigator,
        title: Location.fullName,
        theme: CustomTheme.light,
        initialRoute: '/',
        onGenerateRoute: _routeGenerator.generateRoute,
        builder: (context, child) {
          return BlocProvider(
            create: (context) => engineModeBloc,
            child: MainLayoutBuilder(child: child),
          );
        });
  }
}
