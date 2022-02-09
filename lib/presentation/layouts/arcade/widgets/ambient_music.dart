import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import '../../../../application/engine_mode/engine_mode_bloc.dart';

class AmbientMusic extends HookWidget {
  const AmbientMusic({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller =
        useAnimationController(duration: const Duration(milliseconds: 500));

    return BlocBuilder<EngineModeBloc, EngineModeState>(
      builder: (context, state) {
        state.playingBackgroundMusicOption.fold(() => {}, (isPlaying) {
          if (isPlaying) {
            controller.forward();
          } else {
            controller.reverse();
          }
        });
        return IconButton(
            onPressed: state.playingBackgroundMusicOption.fold(
                () => null,
                (isPlaying) => () => isPlaying
                    ? BlocProvider.of<EngineModeBloc>(context)
                        .add(PauseBackgroundMusicSelected())
                    : BlocProvider.of<EngineModeBloc>(context)
                        .add(PlayBackgroundMusicSelected())),
            icon: AnimatedIcon(
                icon: AnimatedIcons.play_pause, progress: controller));
      },
    );
  }
}
