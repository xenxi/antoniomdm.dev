import 'package:dartz/dartz.dart';

import '../domain/music_player.dart';

class JustAudioMusicPlayer implements MusicPlayer {
  @override
  Future<Either<Failure, Unit>> pause() {
    // TODO: implement pause
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, Unit>> play(String filePath) {
    // TODO: implement play
    throw UnimplementedError();
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
