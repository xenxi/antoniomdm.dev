import 'dart:ui';

import 'package:antoniomdm/shared/values/image_path.dart';
import 'package:flutter/material.dart';

import 'arcade.dart';

class UnderConstructionPage extends StatelessWidget {
  const UnderConstructionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage(ImagePath.bg5),
            fit: BoxFit.cover,
            alignment: Alignment.center,
          ),
        ),
        alignment: Alignment.bottomCenter,
        child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
            child: Transform.translate(
                offset: const Offset(0, 50),
                child: const SizedBox.expand(child: Arcade()))),
      ),
    );
  }
}
