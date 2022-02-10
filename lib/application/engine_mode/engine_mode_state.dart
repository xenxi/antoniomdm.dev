part of 'engine_mode_bloc.dart';

@immutable
class EngineModeState extends Equatable {
  final Engine engine;
  final Option<bool> playingBackgroundMusicOption;
  final bool showLoader;
  final bool isOn;
  factory EngineModeState.initial() => EngineModeState(
      playingBackgroundMusicOption: none(),
      engine: Engine.windows,
      isOn: true,
      showLoader: false);

  const EngineModeState({
    required this.engine,
    required this.playingBackgroundMusicOption,
    required this.showLoader,
    required this.isOn,
  });
  @override
  List<Object?> get props =>
      [playingBackgroundMusicOption, engine, showLoader, isOn];

  EngineModeState copyWith({
    Engine? engine,
    Option<bool>? playingBackgroundMusicOption,
    bool? showLoader,
    bool? isOn,
  }) {
    return EngineModeState(
      engine: engine ?? this.engine,
      playingBackgroundMusicOption:
          playingBackgroundMusicOption ?? this.playingBackgroundMusicOption,
      showLoader: showLoader ?? this.showLoader,
      isOn: isOn ?? this.isOn,
    );
  }
}

enum Engine { windows, arcade }
