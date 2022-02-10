import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../application/engine_mode/engine_mode_bloc.dart';

class Shutdown extends StatelessWidget {
  const Shutdown({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FadeIn(
      child: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            color: Theme.of(context).cardColor,
            child: ZoomOut(
              duration: const Duration(milliseconds: 300),
              delay: const Duration(milliseconds: 4700),
              child: _buildLoader(),
            ),
          ),
          _buildTurnOffAnimation(),
          Positioned(
            top: 20,
            right: 20,
            child: _buildTurnOnButton(context),
          ),
        ],
      ),
    );
  }

  Widget _buildLoader() => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: const [
          SizedBox(
              width: 46,
              height: 46,
              child: CircularProgressIndicator(color: Colors.white)),
          SizedBox(height: 14),
          Text(
            'Apagando',
            style: TextStyle(color: Colors.white),
          ),
        ],
      );

  Widget _buildTurnOffAnimation() => FadeIn(
        delay: const Duration(seconds: 5),
        child: Container(
          height: double.infinity,
          width: double.infinity,
          color: Colors.black,
        ),
      );

  Widget _buildTurnOnButton(BuildContext context) => JelloIn(
        delay: const Duration(seconds: 6),
        child: Pulse(
          infinite: true,
          delay: const Duration(seconds: 10),
          child: IconButton(
            iconSize: 50,
            icon: const Icon(
              Icons.power_settings_new,
              color: Colors.white,
            ),
            onPressed: () =>
                BlocProvider.of<EngineModeBloc>(context).add(TurnOnSelected()),
          ),
        ),
      );
}
