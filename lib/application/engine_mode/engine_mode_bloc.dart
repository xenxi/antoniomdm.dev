import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../domain/music_player.dart';

part 'engine_mode_event.dart';
part 'engine_mode_state.dart';

class EngineModeBloc extends Bloc<EngineModeEvent, EngineModeState> {
  final MusicPlayer player;
  EngineModeBloc(
    this.player,
  ) : super(EngineModeWindows()) {
    on<EngineModeEvent>((event, emit) async {
      if (event is ArcadeEngineModeSelected) {
        emit(EngineModeArcade.initial());
      } else if (event is WindowsEngineModeSelected) {
        emit(EngineModeWindows());
      }
    });
  }
}
