import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'engine_mode_event.dart';
part 'engine_mode_state.dart';

class EngineModeBloc extends Bloc<EngineModeEvent, EngineModeState> {
  EngineModeBloc() : super(EngineModeWindows()) {
    on<EngineModeEvent>((event, emit) {
      if (event is ArcadeEngineModeSelected) {
        emit(EngineModeArcade());
      } else if (event is WindowsEngineModeSelected) {
        emit(EngineModeWindows());
      }
    });
  }
}
