import 'dart:ui';

import 'package:amdiaz/presentation/layouts/arcade/widgets/arcade_container.dart';
import 'package:amdiaz/presentation/layouts/arcade/widgets/desktop_arcade_body.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../application/engine_mode/engine_mode_bloc.dart';
import '../../../shared/values/image_path.dart';
import '../../shared/components/adaptative_funtions.dart';
import 'widgets/ambient_music.dart';
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
          child: Stack(
            children: [
              _buildBody(context, child: ArcadeContainer(child: child)),
              Positioned(
                  top: 20,
                  right: 20,
                  child: Row(
                    children: [
                      IconButton(
                          onPressed: () =>
                              BlocProvider.of<EngineModeBloc>(context)
                                  .add(WindowsEngineModeSelected()),
                          icon: const FaIcon(FontAwesomeIcons.windows)),
                      const AmbientMusic(),
                    ],
                  )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBody(BuildContext context, {required Widget child}) {
    return isMobileScreen(context)
        ? MobileArcadeBody(child: child)
        : DesktopArcadeBody(child: child);
  }
}
