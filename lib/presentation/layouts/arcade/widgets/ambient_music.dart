import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import '../../../../shared/values/audioPath.dart';

class AmbientMusic extends StatefulWidget {
  const AmbientMusic({Key? key}) : super(key: key);

  @override
  State<AmbientMusic> createState() => _AmbientMusicState();
}

class _AmbientMusicState extends State<AmbientMusic> {
  static AudioCache cache = AudioCache();
  AudioPlayer soundManager = AudioPlayer();
  late bool _isPlaying;
  @override
  void initState() {
    super.initState();
    _isPlaying = false;
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
        onPressed: () async => _isPlaying ? await _stop() : await _play(),
        icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow));
  }

  @override
  void dispose() {
    super.dispose();
    soundManager.dispose();
  }

  Future<void> _play() async {
    soundManager = await cache.play(AudioPath.arcadeMusic1);
    // await soundManager.play(AudioPath.arcadeMusic1,
    //     isLocal: true, position: const Duration(seconds: 30));

    setState(() {
      _isPlaying = true;
    });
  }

  Future<void> _stop() async {
    await soundManager.pause();
    setState(() {
      _isPlaying = false;
    });
  }
}
