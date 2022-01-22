import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
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
    _play();
    soundManager.onPlayerStateChanged.listen((state) {
      setState(() {
        _playerState = state;
      });

      if (state == PlayerState.COMPLETED) {
        _play();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: _playerState != PlayerState.PLAYING ? _play : _pause,
      icon: Icon(
          _playerState != PlayerState.PLAYING ? Icons.play_arrow : Icons.pause),
    );
  }

  @override
  void dispose() {
    super.dispose();
    soundManager.stop();
    soundManager.dispose();
  }

  Future<int> _play() async {
    return await soundManager.play(AudioPath.arcadeMusic1, isLocal: true);
  }

  Future<int> _pause() async {
    return await soundManager.pause();
  }
}
