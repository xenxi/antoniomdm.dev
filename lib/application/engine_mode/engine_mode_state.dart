part of 'engine_mode_bloc.dart';

@immutable
abstract class EngineModeState extends Equatable {
  @override
  List<Object?> get props => [];
}

class EngineModeWindows extends EngineModeState {}

class EngineModeArcade extends EngineModeState {}
