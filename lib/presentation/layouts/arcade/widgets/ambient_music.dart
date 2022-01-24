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
// class AmbientMusic extends StatefulWidget {
//   const AmbientMusic({Key? key}) : super(key: key);

//   @override
//   State<AmbientMusic> createState() => _AmbientMusicState();
// }

// class _AmbientMusicState extends State<AmbientMusic> {
//   final player = AudioPlayer();
//   late bool _isPlaying;
//   Duration? _duration;
//   @override
//   void initState() {
//     super.initState();
//     _isPlaying = false;
//     player.setAsset(AudioPath.arcadeMusic1).then((value) {
//       setState(() {
//         _play();
//         _duration = value;
//       });
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (_duration == null) return Container();
//     return IconButton(
//         onPressed: () async => _isPlaying ? await _stop() : await _play(),
//         icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow));
//   }

//   @override
//   void dispose() {
//     super.dispose();
//     player.dispose();
//   }

//   Future<void> _play() async {
//     setState(() {
//       _isPlaying = true;
//     });
//     return player.play();
//   }

//   Future<void> _stop() async {
//     setState(() {
//       _isPlaying = false;
//     });

//     return player.pause();
//   }
// }
