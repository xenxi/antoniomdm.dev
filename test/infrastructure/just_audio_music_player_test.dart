import 'package:amdiaz/infrastructure/just_audio_music_player.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:just_audio/just_audio.dart';
import 'package:mocktail/mocktail.dart';

class MockAudioPlayer extends Mock implements AudioPlayer {}

void main() {
  late AudioPlayer audioPlayer;
  late JustAudioMusicPlayer justAudioMusicPlayer;
  setUp(() {
    audioPlayer = MockAudioPlayer();
    when(() => audioPlayer.setAsset(any()))
        .thenAnswer((_) => Future.value(const Duration()));
    when(() => audioPlayer.play()).thenAnswer((_) => Future.value());
    when(() => audioPlayer.pause()).thenAnswer((_) => Future.value());

    justAudioMusicPlayer = JustAudioMusicPlayer(audioPlayer);
  });
  group('MusicPlayer should', () {
    test('play audio', () async {
      const audioPath = 'anyAudioPath';

      await justAudioMusicPlayer.play(audioPath);

      verifyInOrder([
        () => audioPlayer.setAsset(audioPath),
        () => audioPlayer.play(),
      ]);
    });
    test('play other audio', () async {
      const audioPath = 'anyAudioPath';
      const otherAudioPath = 'otherAudioPath =';
      await justAudioMusicPlayer.play(audioPath);

      await justAudioMusicPlayer.play(otherAudioPath);

      verifyInOrder([
        () => audioPlayer.setAsset(audioPath),
        () => audioPlayer.play(),
        () => audioPlayer.setAsset(otherAudioPath),
        () => audioPlayer.play(),
      ]);
    });
    test('pause audio', () async {
      await justAudioMusicPlayer.pause();

      verify(() => audioPlayer.pause()).called(1);
    });
    test('resume audio', () async {
      const audioPath = 'anyAudioPath';
      await justAudioMusicPlayer.play(audioPath);
      await justAudioMusicPlayer.pause();

      await justAudioMusicPlayer.play(audioPath);

      verifyInOrder([
        () => audioPlayer.setAsset(audioPath),
        () => audioPlayer.play(),
        () => audioPlayer.pause(),
        () => audioPlayer.play(),
      ]);
    });
  });
}
