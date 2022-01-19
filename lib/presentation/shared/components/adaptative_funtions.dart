import 'package:flutter/cupertino.dart';

bool isMobileScreen(BuildContext context) =>
    MediaQuery.of(context).size.width < 720;
