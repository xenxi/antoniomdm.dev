import 'package:amdiaz/shared/values/audioPath.dart';
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
        await state.playingBackgroundMusicOption.fold(() async {
          emit(state.copyWith(engine: Engine.arcade));
          await player.play(AudioPath.arcadeMusic1);
          emit(state.copyWith(playingBackgroundMusicOption: some(true)));
        }, (playingBackgroundMusicOption) async {
          await player.resume();
          emit(state.copyWith(
              engine: Engine.arcade, playingBackgroundMusicOption: some(true)));
        });
      } else if (event is PauseBackgroundMusicSelected) {
        await player.pause();
        emit(state.copyWith(playingBackgroundMusicOption: some(false)));
      } else if (event is ResumeBackgroundMusicSelected) {
        await player.resume();
        emit(state.copyWith(playingBackgroundMusicOption: some(true)));
      } else if (event is WindowsEngineModeSelected) {
        final option = state.playingBackgroundMusicOption.bind((a) {
          if (a) {
            player.pause();
          }
          return some(false);
        });

        emit(state.copyWith(
            engine: Engine.windows, playingBackgroundMusicOption: option));
      }
    });
  }
}
