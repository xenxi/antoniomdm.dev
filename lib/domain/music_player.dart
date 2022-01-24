import 'package:dartz/dartz.dart';

import 'failures.dart';

abstract class MusicPlayer {
  Future<Either<Failure, Unit>> play(String filePath);
  Future<Either<Failure, Unit>> resume();
  Future<Either<Failure, Unit>> pause();
}
