import 'package:antoniomdm/application/engine_mode/engine_mode_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('EngineMode should', () {
    test('be in windows mode as initial state', () {
      final bloc = EngineModeBloc();

      expect(bloc.state, equals(EngineModeWindows()));
    });

    blocTest<EngineModeBloc, EngineModeState>('switch to arcade mode',
        build: () => EngineModeBloc(),
        act: (bloc) => bloc.add(ArcadeEngineModeSelected()),
        expect: () => [
              EngineModeArcade(),
            ]);
  });

  blocTest<EngineModeBloc, EngineModeState>('switch to windows mode',
      build: () => EngineModeBloc(),
      act: (bloc) => bloc.add(WindowsEngineModeSelected()),
      expect: () => [
            EngineModeWindows(),
          ]);
}
