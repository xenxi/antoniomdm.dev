import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class TerminalLayout extends StatelessWidget {
  final Widget child;
  const TerminalLayout({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Card(
        clipBehavior: Clip.antiAlias,
        margin: EdgeInsets.all(20),
        // decoration: BoxDecoration(
        //   border: Border.all(
        //     color: Colors.black,
        //     width: 1,
        //   ),
        // ),
        child: Column(
          children: [
            Container(
              width: double.infinity,
              height: 80,
              color: Theme.of(context).primaryColor,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              margin: const EdgeInsets.only(
                bottom: 20,
              ),
              child: Row(
                children: [
                  TextButton.icon(
                      onPressed: () {},
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
    );
  }
}
