import 'package:dartz/dartz.dart';
import 'package:just_audio/just_audio.dart';

import '../domain/failures.dart';
import '../domain/music_player.dart';

class JustAudioMusicPlayer implements MusicPlayer {
  final AudioPlayer _player;
  String? _currentUrl;
  JustAudioMusicPlayer(this._player);
  @override
  Future<Either<Failure, Unit>> pause() async {
    await _player.pause();
    return right(unit);
  }

  @override
  Future<Either<Failure, Unit>> play(String filePath) async {
    if (_currentUrl != filePath) {
      final duration = await _player.setAsset(filePath);
      if (duration == null) {
        return Left(Failure());
      }
      _currentUrl = filePath;
    }

    _player.play();

    return const Right(unit);
  }

  @override
  Future<Either<Failure, Unit>> resume() {
    _player.play();
    return Future.value(right(unit));
  }
}
