import 'package:amdiaz/application/engine_mode/engine_mode_bloc.dart';
import 'package:amdiaz/domain/music_player.dart';
import 'package:amdiaz/shared/values/audioPath.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockMusicPlayer extends Mock implements MusicPlayer {}

void main() {
  late MusicPlayer musicPlayer;

  setUp(() {
    musicPlayer = MockMusicPlayer();
  });
  group('EngineMode should', () {
    test('be in windows mode as initial state', () {
      final bloc = EngineModeBloc(musicPlayer);

      expect(bloc.state, equals(EngineModeWindows()));
    });

    blocTest<EngineModeBloc, EngineModeState>('switch to arcade mode',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc.add(ArcadeEngineModeSelected()),
        expect: () => [
              EngineModeArcade(playingBackgroundMusicOption: none()),
            ]);
  });

  blocTest<EngineModeBloc, EngineModeState>('switch to windows mode',
      build: () => EngineModeBloc(musicPlayer),
      act: (bloc) => bloc.add(WindowsEngineModeSelected()),
      expect: () => [
            EngineModeWindows(),
          ]);
  blocTest<EngineModeBloc, EngineModeState>(
      'play blackground music when switch to arcade mode',
      build: () => EngineModeBloc(musicPlayer),
      act: (bloc) => bloc.add(WindowsEngineModeSelected()),
      verify: (_) {
        verify(
          () => musicPlayer.play(AudioPath.arcadeMusic1),
        ).called(1);
      },
      expect: () => [
            EngineModeArcade(playingBackgroundMusicOption: none()),
            EngineModeArcade(playingBackgroundMusicOption: some(true)),
          ]);
}
