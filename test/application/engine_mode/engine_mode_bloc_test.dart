import 'package:amdiaz/application/engine_mode/engine_mode_bloc.dart';
import 'package:amdiaz/domain/music_player.dart';
import 'package:amdiaz/shared/values/audio_path.dart';
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

      expect(
          bloc.state,
          equals(EngineModeState(
              isOn: true,
              engine: Engine.windows,
              playingBackgroundMusicOption: none(),
              showLoader: false)));
    });

    blocTest<EngineModeBloc, EngineModeState>('switch to windows mode',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc.add(WindowsEngineModeSelected()),
        expect: () => [
              EngineModeState(
                  isOn: true,
                  engine: Engine.windows,
                  playingBackgroundMusicOption: none(),
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>('switch to arcade mode',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc.add(ArcadeEngineModeSelected()),
        expect: () => [
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.arcade,
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>('to turn off',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc.add(TurnOffSelected()),
        expect: () => [
              EngineModeState(
                  isOn: false,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.windows,
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>('to turn on',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc
          ..add(TurnOffSelected())
          ..add(TurnOnSelected()),
        expect: () => [
              EngineModeState(
                  isOn: false,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.windows,
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.windows,
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>(
        'play blackground music in arcade mode',
        build: () => EngineModeBloc(musicPlayer),
        setUp: () {
          when(
            () => musicPlayer.play(any()),
          ).thenAnswer((_) => Future.value(right(unit)));
        },
        act: (bloc) => bloc
          ..add(ArcadeEngineModeSelected())
          ..add(PlayBackgroundMusicSelected()),
        verify: (_) => verify(
              () => musicPlayer.play(AudioPath.arcadeMusic1),
            ).called(1),
        expect: () => [
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.arcade,
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade,
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>('pause blackground music',
        build: () => EngineModeBloc(musicPlayer),
        setUp: () {
          when(
            () => musicPlayer.play(any()),
          ).thenAnswer((_) => Future.value(right(unit)));
          when(
            () => musicPlayer.pause(),
          ).thenAnswer((_) => Future.value(right(unit)));
        },
        act: (bloc) => bloc
          ..add(ArcadeEngineModeSelected())
          ..add(PlayBackgroundMusicSelected())
          ..add(PauseBackgroundMusicSelected()),
        verify: (_) {
          verify(
            () => musicPlayer.pause(),
          ).called(1);
        },
        expect: () => [
              EngineModeState(
                  isOn: true,
                  engine: Engine.arcade,
                  playingBackgroundMusicOption: none(),
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  engine: Engine.arcade,
                  playingBackgroundMusicOption: some(true),
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  engine: Engine.arcade,
                  playingBackgroundMusicOption: some(false),
                  showLoader: false),
            ]);
    blocTest<EngineModeBloc, EngineModeState>('resume blackground music',
        build: () => EngineModeBloc(musicPlayer),
        setUp: () {
          when(
            () => musicPlayer.play(any()),
          ).thenAnswer((_) => Future.value(right(unit)));
          when(
            () => musicPlayer.pause(),
          ).thenAnswer((_) => Future.value(right(unit)));
        },
        act: (bloc) => bloc
          ..add(ArcadeEngineModeSelected())
          ..add(PlayBackgroundMusicSelected())
          ..add(PauseBackgroundMusicSelected())
          ..add(PlayBackgroundMusicSelected()),
        verify: (_) {
          verifyInOrder([
            () => musicPlayer.play(AudioPath.arcadeMusic1),
            () => musicPlayer.pause(),
            () => musicPlayer.play(AudioPath.arcadeMusic1),
          ]);
        },
        expect: () => [
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: none(),
                  engine: Engine.arcade,
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade,
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: some(false),
                  engine: Engine.arcade,
                  showLoader: false),
              EngineModeState(
                  isOn: true,
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade,
                  showLoader: false),
            ]);
  });
}
