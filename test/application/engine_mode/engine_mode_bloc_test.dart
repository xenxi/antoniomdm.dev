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

      expect(
          bloc.state,
          equals(EngineModeState(
              engine: Engine.windows, playingBackgroundMusicOption: none())));
    });

    blocTest<EngineModeBloc, EngineModeState>('switch to windows mode',
        build: () => EngineModeBloc(musicPlayer),
        act: (bloc) => bloc.add(WindowsEngineModeSelected()),
        expect: () => [
              EngineModeState(
                  engine: Engine.windows, playingBackgroundMusicOption: none()),
            ]);
    blocTest<EngineModeBloc, EngineModeState>(
        'play blackground music when switch to arcade mode',
        build: () => EngineModeBloc(musicPlayer),
        setUp: () {
          when(
            () => musicPlayer.play(any()),
          ).thenAnswer((_) => Future.value(right(unit)));
        },
        act: (bloc) => bloc.add(ArcadeEngineModeSelected()),
        verify: (_) {
          verify(
            () => musicPlayer.play(AudioPath.arcadeMusic1),
          ).called(1);
        },
        expect: () => [
              EngineModeState(
                  playingBackgroundMusicOption: none(), engine: Engine.arcade),
              EngineModeState(
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade),
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
          ..add(PauseBackgroundMusicSelected()),
        verify: (_) {
          verify(
            () => musicPlayer.pause(),
          ).called(1);
        },
        expect: () => [
              EngineModeState(
                  engine: Engine.arcade, playingBackgroundMusicOption: none()),
              EngineModeState(
                  engine: Engine.arcade,
                  playingBackgroundMusicOption: some(true)),
              EngineModeState(
                  engine: Engine.arcade,
                  playingBackgroundMusicOption: some(false)),
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
          when(
            () => musicPlayer.resume(),
          ).thenAnswer((_) => Future.value(right(unit)));
        },
        act: (bloc) => bloc
          ..add(ArcadeEngineModeSelected())
          ..add(PauseBackgroundMusicSelected())
          ..add(ResumeBackgroundMusicSelected()),
        verify: (_) {
          verify(
            () => musicPlayer.resume(),
          ).called(1);
        },
        expect: () => [
              EngineModeState(
                  playingBackgroundMusicOption: none(), engine: Engine.arcade),
              EngineModeState(
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade),
              EngineModeState(
                  playingBackgroundMusicOption: some(false),
                  engine: Engine.arcade),
              EngineModeState(
                  playingBackgroundMusicOption: some(true),
                  engine: Engine.arcade),
            ]);
  });
}
