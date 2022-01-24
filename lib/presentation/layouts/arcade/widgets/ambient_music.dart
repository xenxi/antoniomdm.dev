import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../application/engine_mode/engine_mode_bloc.dart';

class AmbientMusic extends StatelessWidget {
  const AmbientMusic({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<EngineModeBloc, EngineModeState>(
      listener: (context, state) {},
      builder: (context, state) {
        if (state is EngineModeArcade &&
            state.playingBackgroundMusicOption.isSome()) {
          final isPlaying =
              state.playingBackgroundMusicOption.getOrElse(() => false);
          return IconButton(
              onPressed: () => isPlaying
                  ? BlocProvider.of<EngineModeBloc>(context)
                      .add(PauseBackgroundMusicSelected())
                  : BlocProvider.of<EngineModeBloc>(context)
                      .add(ResumeBackgroundMusicSelected()),
              icon: Icon(isPlaying ? Icons.pause : Icons.play_arrow));
        }
        return Container();
      },
    );
  }
}
