import 'package:antoniomdm/application/engine_mode/engine_mode_bloc.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('EngineMode should', () {
    test('be in windows mode as initial state', () {
      final bloc = EngineModeBloc();

      expect(bloc.state, equals(EngineModeWindows()));
    });
  });
}
