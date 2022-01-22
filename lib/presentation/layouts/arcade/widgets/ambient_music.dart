import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import '../../../../shared/values/audioPath.dart';

class AmbientMusic extends StatefulWidget {
  const AmbientMusic({Key? key}) : super(key: key);

  @override
  State<AmbientMusic> createState() => _AmbientMusicState();
}

class _AmbientMusicState extends State<AmbientMusic> {
  AudioPlayer soundManager = AudioPlayer();
  late PlayerState _playerState;
  @override
  void initState() {
    super.initState();
    _playerState = PlayerState.STOPPED;
    // _play();
    // soundManager.onPlayerStateChanged.listen((state) {
    //   if (state == PlayerState.COMPLETED) {
    //     _stop();
    //   }
    // });
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () async =>
          _playerState != PlayerState.PLAYING ? await _play() : await _stop(),
      icon: Icon(
          _playerState != PlayerState.PLAYING ? Icons.play_arrow : Icons.pause),
    );
  }

  @override
  void dispose() {
    super.dispose();
    soundManager.dispose();
  }

  Future<void> _play() async {
    await soundManager.play(AudioPath.arcadeMusic1,
        isLocal: true, position: const Duration(seconds: 30));

    setState(() {
      _playerState = PlayerState.PLAYING;
    });
  }

  Future<void> _stop() async {
    await soundManager.pause();
    setState(() {
      _playerState = PlayerState.STOPPED;
    });
  }
}
