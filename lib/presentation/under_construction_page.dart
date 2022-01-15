import 'package:antoniomdm/shared/values/image_path.dart';
import 'package:flutter/material.dart';

class UnderConstructionPage extends StatelessWidget {
  const UnderConstructionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(ImagePath.bg3),
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
          ),
          child: Center(
            child: SizedBox(
              width: 900,
              child: Stack(
                children: [
                  const Image(
                    image: AssetImage(ImagePath.arcade),
                    fit: BoxFit.fitWidth,
                    alignment: Alignment.center,
                  ),
                  Positioned(
                    top: 230,
                    left: 195,
                    width: 500,
                    height: 380,
                    child: Transform(
                      transform: Matrix4.identity()
                        ..setEntry(3, 2, 0.001)
                        ..rotateX(-.4),
                      alignment: FractionalOffset.center,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text(
                              'Antonio Manuel Díaz Moreno',
                              style: Theme.of(context).textTheme.headline1,
                            ),
                            Text(
                              'Under Construction',
                              style: Theme.of(context).textTheme.headlineLarge,
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
