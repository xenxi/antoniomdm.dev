import 'package:amdiaz/shared/values/audio_path.dart';
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
  ) : super(EngineModeState.initial()) {
    on<EngineModeEvent>((event, emit) async {
      if (event is ArcadeEngineModeSelected) {
        emit(state.copyWith(engine: Engine.arcade));
      } else if (event is PauseBackgroundMusicSelected) {
        await player.pause();
        emit(state.copyWith(playingBackgroundMusicOption: some(false)));
      } else if (event is PlayBackgroundMusicSelected) {
        await player.play(AudioPath.arcadeMusic1);
        emit(state.copyWith(playingBackgroundMusicOption: some(true)));
      } else if (event is WindowsEngineModeSelected) {
        emit(state.copyWith(engine: Engine.windows));
      } else if (event is TurnOffSelected) {
        emit(state.copyWith(isOn: false));
      } else if (event is TurnOnSelected) {
        emit(state.copyWith(isOn: true));
      }
    });
  }
}
