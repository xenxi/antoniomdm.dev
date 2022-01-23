import 'package:dartz/dartz.dart';

abstract class MusicPlayer {
  Future<Either<Failure, Unit>> play(String filePath);
  Future<Either<Failure, Unit>> resume();
  Future<Either<Failure, Unit>> pause();
  Future<Either<Failure, Unit>> stop();
}

class Failure {
  final String message;
  Failure({this.message = 'Something went wrong'});
}
