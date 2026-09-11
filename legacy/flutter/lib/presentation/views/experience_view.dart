import 'package:flutter/material.dart';

import '../../shared/widgets/custom_stepper.dart';

class ExperienceView extends StatelessWidget {
  const ExperienceView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Center(
            child: Text(
              'Experience',
              style: Theme.of(context).textTheme.headline1,
            ),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        backgroundColor: Colors.transparent,
        body: _stepper());
  }

  Widget _stepper() {
    return CustomStepper(steps: [
      Step(
        state: StepState.complete,
        title: Text('Software Engineer'),
        subtitle: Text('Domingo Alonso Group - Julio 2021 - Actualidad'),
        content: Text(
            'Lorem ipsum dolor sit amet, con,sectetur adipiscing elit. Sed volutpat leo nec odio consequat, non mollis quam placerat. Praesent venenatis, ante ut tincidunt elementum, velit lorem pellentesque arcu, sit amet laoreet est turpis ut libero. Cras dolor magna, elementum eget dictum in, porta quis nisl. Vivamus vitae nisi sed urna hendrerit pharetra lobortis quis lorem. Sed porta mi nec arcu viverra sollicitudin. Curabitur nisl lorem, iaculis eget malesuada et, cursus ultricies magna. Cras feugiat augue et purus pellentesque ullamcorper. Aliquam gravida purus in ex condimentum, in semper neque vehicula. Etiam egestas mauris in feugiat dictum. '),
        isActive: true,
      ),
      Step(
        title: Text('Step 2'),
        content: Text('This is the second step'),
        isActive: true,
      ),
      Step(
        title: Text('Step 3'),
        content: Text('This is the third step'),
        isActive: true,
      ),
    ]);
  }
}
