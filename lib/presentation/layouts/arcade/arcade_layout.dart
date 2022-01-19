import 'dart:ui';

import 'package:antoniomdm/presentation/layouts/arcade/widgets/arcade_container.dart';
import 'package:antoniomdm/presentation/layouts/arcade/widgets/desktop_arcade_body.dart';
import 'package:antoniomdm/presentation/shared/widgets/components/adaptative_funtions.dart';
import 'package:flutter/material.dart';

import '../../../shared/values/image_path.dart';
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
          child: _buildBody(context, child: ArcadeContainer(child: child)),
        ),
      ),
    );
  }

  Widget _buildBody(BuildContext context, {required Widget child}) {
    return isMobile(context)
        ? MobileArcadeBody(child: child)
        : DesktopArcadeBody(child: child);
  }
}
