import 'package:flutter/material.dart';

class Terminal extends StatelessWidget {
  const Terminal({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Stack(
        children: [
          Container(
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
          ),
        ],
      ),
    );
  }
}
