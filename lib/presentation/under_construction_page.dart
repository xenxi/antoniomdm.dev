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
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        alignment: Alignment.bottomCenter,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
          child: _buildBody(),
        ),
      ),
    );
  }

  Widget _buildBody() => LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          if (constraints.maxWidth < 630) {
            return Transform.scale(
                scale: 1.3,
                origin: Offset(-30, constraints.maxWidth < 350 ? 50 : 140),
                alignment: Alignment.center,
                child: const Arcade());
          }

          return Transform.translate(
              offset: const Offset(0, 50), child: const Arcade());
        },
      );
}
