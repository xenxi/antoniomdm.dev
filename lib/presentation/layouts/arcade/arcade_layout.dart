import 'dart:ui';

import 'package:antoniomdm/presentation/layouts/arcade/widgets/arcade_container.dart';
import 'package:flutter/material.dart';

import '../../../shared/values/image_path.dart';
import '../../../shared/widgets/neon_text.dart';
import 'widgets/mobile_arcade_body.dart';

class ArcadeLayout extends StatelessWidget {
  final Widget child;
  const ArcadeLayout({
    required this.child,
    Key? key,
  }) : super(key: key);

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
          child: _buildBody(child: ArcadeContainer(child: child)),
        ),
      ),
    );
  }

  Widget _buildBody({required Widget child}) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        if (constraints.maxWidth < 720) {
          return MobileArcadeBody(maxWidth: constraints.maxWidth, child: child);
        }
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
                  child: child),
            ] else ...[
              const Spacer(),
              const NeonText('Hello World', fontSize: 120),
              const Spacer(),
              Expanded(
                flex: 10,
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Transform.translate(
                      offset: const Offset(0, 50), child: child),
                ),
              ),
            ],
          ],
        );
      },
    );
  }
}
