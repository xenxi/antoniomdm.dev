import 'package:antoniomdm/shared/values/image_path.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../shared/components/launcher_funtions.dart';

class TerminalLayout extends StatelessWidget {
  final Widget child;
  const TerminalLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const SizedBox.expand(
            child: Image(image: AssetImage(ImagePath.bg7), fit: BoxFit.cover),
          ),
          Align(
            alignment: Alignment.center,
            child: FittedBox(
              child: SizedBox(
                height: 500,
                width: 600,
                child: Card(
                  clipBehavior: Clip.antiAlias,
                  margin: const EdgeInsets.all(20),
                  elevation: 8,
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        height: 60,
                        color: Theme.of(context).primaryColor,
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        margin: const EdgeInsets.only(
                          bottom: 20,
                        ),
                        child: Row(
                          children: [
                            TextButton.icon(
                                style: TextButton.styleFrom(
                                  primary: Colors.white,
                                ),
                                onPressed: () =>
                                    openUrl('https://github.com/xenxi'),
                                icon: const FaIcon(FontAwesomeIcons.github),
                                label: const Text('C:/github/xenxi.exe')),
                            const Spacer(),
                            IconButton(
                                hoverColor: Colors.black,
                                focusColor: Colors.black,
                                highlightColor: Colors.black,
                                splashColor: Colors.black,
                                onPressed: () {},
                                icon: const Icon(Icons.minimize_outlined)),
                            IconButton(
                                hoverColor: Colors.black,
                                focusColor: Colors.black,
                                highlightColor: Colors.black,
                                splashColor: Colors.black,
                                onPressed: () {},
                                icon: const Icon(Icons.fullscreen_outlined)),
                            IconButton(
                                hoverColor: Colors.black,
                                focusColor: Colors.black,
                                highlightColor: Colors.black,
                                splashColor: Colors.black,
                                onPressed: () {},
                                icon: const Icon(Icons.close_outlined)),
                          ],
                        ),
                      ),
                      Expanded(child: child),
                      const SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              width: double.infinity,
              height: 50,
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: const BorderRadius.all(Radius.circular(2)),
                border: Border.all(color: Colors.grey, width: .2),
              ),
              child: Wrap(
                children: [
                  SizedBox(
                    height: 50,
                    width: 50,
                    child: IconButton(
                        onPressed: () {},
                        icon: const FaIcon(FontAwesomeIcons.windows)),
                  ),
                  Container(
                    height: 50,
                    width: 50,
                    decoration: BoxDecoration(
                        color: Colors.white.withOpacity(.1),
                        border: const Border(
                          bottom: BorderSide(
                            color: Colors.white,
                            width: .6,
                          ),
                        )),
                    child: IconButton(
                        onPressed: () {},
                        icon: const FaIcon(FontAwesomeIcons.github)),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
