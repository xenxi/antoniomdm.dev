import 'dart:ui';

import 'package:antoniomdm/shared/values/image_path.dart';
import 'package:flutter/material.dart';

import '../shared/widgets/neon_text.dart';
import 'arcade.dart';

class UnderConstructionPage extends StatelessWidget {
  const UnderConstructionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        clipBehavior: Clip.hardEdge,
        decoration: BoxDecoration(
          image: DecorationImage(
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.5),
              BlendMode.darken,
            ),
            image: const AssetImage(ImagePath.bg5),
            fit: BoxFit.cover,
            alignment: Alignment.center,
          ),
        ),
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
          child: _buildBody(),
        ),
      ),
    );
  }

  Widget _buildBody() => LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              if (constraints.maxWidth < 720) ...[
                const Spacer(),
                const NeonText('Hello World', fontSize: 80),
                const Spacer(
                  flex: 2,
                ),
                Transform.scale(
                    scale: 1.25,
                    origin: Offset(-35, constraints.maxWidth < 350 ? 50 : 140),
                    alignment: Alignment.center,
                    child: const Arcade()),
              ] else ...[
                const Spacer(),
                const NeonText('Hello World', fontSize: 120),
                const Spacer(),
                Expanded(
                  flex: 10,
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Transform.translate(
                        offset: const Offset(0, 50), child: const Arcade()),
                  ),
                ),
              ],
            ],
          );
        },
      );
}
