import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import '../../../../shared/values/audioPath.dart';

class AmbientMusic extends StatefulWidget {
  const AmbientMusic({Key? key}) : super(key: key);

  @override
  State<AmbientMusic> createState() => _AmbientMusicState();
}

class _AmbientMusicState extends State<AmbientMusic> {
  final player = AudioPlayer();
  late bool _isPlaying;
  Duration? _duration;
  @override
  void initState() {
    super.initState();
    _isPlaying = false;
    player.setAsset(AudioPath.arcadeMusic1).then((value) {
      setState(() {
        _play();
        _duration = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_duration == null) return Container();
    return IconButton(
        onPressed: () async => _isPlaying ? await _stop() : await _play(),
        icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow));
  }

  @override
  void dispose() {
    super.dispose();
    player.dispose();
  }

  Future<void> _play() async {
    setState(() {
      _isPlaying = true;
    });
    return player.play();
  }

  Future<void> _stop() async {
    setState(() {
      _isPlaying = false;
    });

    return player.pause();
  }
}
