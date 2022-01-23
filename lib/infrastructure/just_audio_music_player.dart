import 'package:dartz/dartz.dart';
import 'package:just_audio/just_audio.dart';

import '../domain/music_player.dart';

class JustAudioMusicPlayer implements MusicPlayer {
  final _player = AudioPlayer();
  @override
  Future<Either<Failure, Unit>> pause() {
    // TODO: implement pause
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Unit>> play(String filePath) async {
    final duration = await _player.setAsset(filePath);
    if (duration == null) {
      return Left(Failure());
    }
    _player.play();

    return const Right(unit);
  }

  @override
  Future<Either<Failure, Unit>> resume() {
    // TODO: implement resume
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Unit>> stop() {
    // TODO: implement stop
    throw UnimplementedError();
  }
}
