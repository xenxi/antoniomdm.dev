import 'package:flutter/cupertino.dart';

bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 720;
