import 'package:flutter/material.dart';

import '../shared/values/image_path.dart';

class Arcade extends StatelessWidget {
  const Arcade({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FittedBox(
      child: Stack(
        children: [
          const Image(
            image: AssetImage(ImagePath.arcade),
            fit: BoxFit.fitWidth,
            alignment: Alignment.center,
          ),
          Positioned(
            top: 420,
            left: 340,
            width: 890,
            height: 650,
            child: Transform(
              transform: Matrix4.identity()
                ..setEntry(3, 2, 0.001)
                ..rotateX(-.15),
              alignment: FractionalOffset.center,
              child: _buildConsole(context),
            ),
          )
        ],
      ),
    );
  }

  Container _buildConsole(BuildContext context) {
    return Container(
      color: Colors.green.withOpacity(.5),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 50),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            'Antonio Manuel Díaz Moreno',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.headline1,
          ),
          const SizedBox(height: 10),
          Text(
            'Developer | .NET | TypeScript | Dart | Angular | Flutter 🚀',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.subtitle1,
          ),
          const Spacer(),
          Text(
            'Under Construction',
            style: Theme.of(context).textTheme.headline2,
          ),
          const Spacer(),
        ],
      ),
    );
  }
}
