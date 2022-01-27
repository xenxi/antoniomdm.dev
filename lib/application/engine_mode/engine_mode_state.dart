part of 'engine_mode_bloc.dart';

@immutable
class EngineModeState extends Equatable {
  final Engine engine;
  final Option<bool> playingBackgroundMusicOption;
  final bool showLoader;
  factory EngineModeState.initial() => EngineModeState(
      playingBackgroundMusicOption: none(),
      engine: Engine.windows,
      showLoader: false);

  const EngineModeState({
    required this.engine,
    required this.playingBackgroundMusicOption,
    required this.showLoader,
  });
  @override
  List<Object?> get props => [playingBackgroundMusicOption, engine];

  EngineModeState copyWith({
    Engine? engine,
    Option<bool>? playingBackgroundMusicOption,
    bool? showLoader,
  }) {
    return EngineModeState(
      engine: engine ?? this.engine,
      playingBackgroundMusicOption:
          playingBackgroundMusicOption ?? this.playingBackgroundMusicOption,
      showLoader: showLoader ?? this.showLoader,
    );
  }
}

enum Engine { windows, arcade }
