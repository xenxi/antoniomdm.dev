import 'dart:ui';

import 'package:amdiaz/presentation/layouts/arcade/widgets/arcade_container.dart';
import 'package:amdiaz/presentation/layouts/arcade/widgets/desktop_arcade_body.dart';
import 'package:amdiaz/shared/values/audioPath.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';

import '../../../shared/values/image_path.dart';
import '../../shared/components/adaptative_funtions.dart';
import 'widgets/mobile_arcade_body.dart';

class ArcadeLayout extends StatelessWidget {
  final Widget child;
  const ArcadeLayout({
    required this.child,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    _play();
    return Scaffold(
      body: Container(
        clipBehavior: Clip.hardEdge,
        decoration: BoxDecoration(
          image: DecorationImage(
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.5),
              BlendMode.darken,
            ),
            image: const AssetImage(ImagePath.animatedBg1),
            fit: BoxFit.cover,
            repeat: ImageRepeat.noRepeat,
            alignment: Alignment.center,
          ),
        ),
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 4, sigmaY: 4),
          child: _buildBody(context, child: ArcadeContainer(child: child)),
        ),
      ),
    );
  }

  Future<void> _play() async {
    AudioPlayer audioPlayer = AudioPlayer();
    final player =
        await audioPlayer.play(AudioPath.arcadeMusic1, isLocal: true);
  }

  Widget _buildBody(BuildContext context, {required Widget child}) {
    return isMobileScreen(context)
        ? MobileArcadeBody(child: child)
        : DesktopArcadeBody(child: child);
  }
}
