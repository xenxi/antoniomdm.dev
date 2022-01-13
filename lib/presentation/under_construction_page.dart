import 'package:flutter/material.dart';

class UnderConstructionPage extends StatelessWidget {
  const UnderConstructionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: FittedBox(
            child: Column(
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
      ),
    );
  }
}
