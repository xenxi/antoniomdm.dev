part of 'engine_mode_bloc.dart';

@immutable
class EngineModeState extends Equatable {
  final Engine engine;
  final Option<bool> playingBackgroundMusicOption;
  factory EngineModeState.initial() => EngineModeState(
        playingBackgroundMusicOption: none(),
        engine: Engine.windows,
      );

  const EngineModeState({
    required this.engine,
    required this.playingBackgroundMusicOption,
  });
  @override
  List<Object?> get props => [playingBackgroundMusicOption, engine];

  EngineModeState copyWith({
    Engine? engine,
    Option<bool>? playingBackgroundMusicOption,
  }) {
    return EngineModeState(
      engine: engine ?? this.engine,
      playingBackgroundMusicOption:
          playingBackgroundMusicOption ?? this.playingBackgroundMusicOption,
    );
  }
}

enum Engine { windows, arcade }
