import 'package:antoniomdm/shared/values/image_path.dart';
import 'package:flutter/material.dart';

import 'ardade.dart';

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
          child: const Center(
            child: Arcade(),
          ),
        ),
      ),
    );
  }
}
