import 'package:flutter/material.dart';

@immutable
class ControlsDetails {
  const ControlsDetails({
    required this.currentStep,
    required this.stepIndex,
    this.onStepCancel,
    this.onStepContinue,
  });

  final int currentStep;

  final int stepIndex;

  final VoidCallback? onStepContinue;

  final VoidCallback? onStepCancel;

  bool get isActive => currentStep == stepIndex;
}

typedef ControlsWidgetBuilder = Widget Function(
    BuildContext context, ControlsDetails details);

const TextStyle _kStepStyle = TextStyle(
  fontSize: 12.0,
  color: Colors.white,
);
const Color _kErrorLight = Colors.red;
final Color _kErrorDark = Colors.red.shade400;
const Color _kCircleActiveLight = Colors.white;
const Color _kCircleActiveDark = Colors.black87;
const Color _kDisabledLight = Colors.black38;
const Color _kDisabledDark = Colors.white38;
const double _kStepSize = 24.0;
const double _kTriangleHeight = _kStepSize * 0.866025;

class CustomStepper extends StatefulWidget {
  const CustomStepper({
    Key? key,
    required this.steps,
    this.physics,
    this.type = StepperType.vertical,
    this.currentStep = 0,
    this.onStepTapped,
    this.onStepContinue,
    this.onStepCancel,
    this.controlsBuilder,
    this.elevation,
    this.margin,
  })  : assert(steps != null),
        assert(type != null),
        assert(currentStep != null),
        assert(0 <= currentStep && currentStep < steps.length),
        super(key: key);

  final List<Step> steps;

  final ScrollPhysics? physics;

  final StepperType type;

  final int currentStep;

  final ValueChanged<int>? onStepTapped;

  final VoidCallback? onStepContinue;

  final VoidCallback? onStepCancel;

  final ControlsWidgetBuilder? controlsBuilder;

  final double? elevation;

  final EdgeInsetsGeometry? margin;

  @override
  State<CustomStepper> createState() => _CustomStepperState();
}

class _CustomStepperState extends State<CustomStepper>
    with TickerProviderStateMixin {
  late List<GlobalKey> _keys;
  final Map<int, StepState> _oldStates = <int, StepState>{};

  @override
  void initState() {
    super.initState();
    _keys = List<GlobalKey>.generate(
      widget.steps.length,
      (int i) => GlobalKey(),
    );

    for (int i = 0; i < widget.steps.length; i += 1)
      _oldStates[i] = widget.steps[i].state;
  }

  @override
  void didUpdateWidget(CustomStepper oldWidget) {
    super.didUpdateWidget(oldWidget);
    assert(widget.steps.length == oldWidget.steps.length);

    for (int i = 0; i < oldWidget.steps.length; i += 1)
      _oldStates[i] = oldWidget.steps[i].state;
  }

  bool _isFirst(int index) {
    return index == 0;
  }

  bool _isLast(int index) {
    return widget.steps.length - 1 == index;
  }

  bool _isCurrent(int index) {
    return widget.currentStep == index;
  }

  bool _isDark() {
    return Theme.of(context).brightness == Brightness.dark;
  }

  Widget _buildLine(bool visible) {
    return Container(
      width: visible ? 1.0 : 0.0,
      height: 16.0,
      color: Colors.grey.shade400,
    );
  }

  Widget _buildCircleChild(int index, bool oldState) {
    final StepState state =
        oldState ? _oldStates[index]! : widget.steps[index].state;
    final bool isDarkActive = _isDark() && widget.steps[index].isActive;
    assert(state != null);
    switch (state) {
      case StepState.indexed:
      case StepState.disabled:
        return Text(
          '${index + 1}',
          style: isDarkActive
              ? _kStepStyle.copyWith(color: Colors.black87)
              : _kStepStyle,
        );
      case StepState.editing:
        return Icon(
          Icons.edit,
          color: isDarkActive ? _kCircleActiveDark : _kCircleActiveLight,
          size: 18.0,
        );
      case StepState.complete:
        return Icon(
          Icons.check,
          color: isDarkActive ? _kCircleActiveDark : _kCircleActiveLight,
          size: 18.0,
        );
      case StepState.error:
        return const Text('!', style: _kStepStyle);
    }
  }

  Color _circleColor(int index) {
    final ColorScheme colorScheme = Theme.of(context).colorScheme;
    if (!_isDark()) {
      return widget.steps[index].isActive
          ? colorScheme.primary
          : colorScheme.onSurface.withOpacity(0.38);
    } else {
      return widget.steps[index].isActive
          ? colorScheme.secondary
          : colorScheme.background;
    }
  }

  Widget _buildCircle(int index, bool oldState) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      width: _kStepSize,
      height: _kStepSize,
      child: AnimatedContainer(
        curve: Curves.fastOutSlowIn,
        duration: kThemeAnimationDuration,
        decoration: BoxDecoration(
          color: _circleColor(index),
          shape: BoxShape.circle,
        ),
        child: Center(
          child: _buildCircleChild(
              index, oldState && widget.steps[index].state == StepState.error),
        ),
      ),
    );
  }

  Widget _buildTriangle(int index, bool oldState) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      width: _kStepSize,
      height: _kStepSize,
      child: Center(
        child: SizedBox(
          width: _kStepSize,
          height: _kTriangleHeight,
          child: CustomPaint(
            painter: _TrianglePainter(
              color: _isDark() ? _kErrorDark : _kErrorLight,
            ),
            child: Align(
              alignment: const Alignment(0.0, 0.8),
              child: _buildCircleChild(index,
                  oldState && widget.steps[index].state != StepState.error),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildIcon(int index) {
    if (widget.steps[index].state != _oldStates[index]) {
      return AnimatedCrossFade(
        firstChild: _buildCircle(index, true),
        secondChild: _buildTriangle(index, true),
        firstCurve: const Interval(0.0, 0.6, curve: Curves.fastOutSlowIn),
        secondCurve: const Interval(0.4, 1.0, curve: Curves.fastOutSlowIn),
        sizeCurve: Curves.fastOutSlowIn,
        crossFadeState: widget.steps[index].state == StepState.error
            ? CrossFadeState.showSecond
            : CrossFadeState.showFirst,
        duration: kThemeAnimationDuration,
      );
    } else {
      if (widget.steps[index].state != StepState.error)
        return _buildCircle(index, false);
      else
        return _buildTriangle(index, false);
    }
  }

  Widget _buildVerticalControls(int stepIndex) {
    if (widget.controlsBuilder != null)
      return widget.controlsBuilder!(
        context,
        ControlsDetails(
          currentStep: widget.currentStep,
          onStepContinue: widget.onStepContinue,
          onStepCancel: widget.onStepCancel,
          stepIndex: stepIndex,
        ),
      );

    final Color cancelColor;
    switch (Theme.of(context).brightness) {
      case Brightness.light:
        cancelColor = Colors.black54;
        break;
      case Brightness.dark:
        cancelColor = Colors.white70;
        break;
    }

    final ThemeData themeData = Theme.of(context);
    final ColorScheme colorScheme = themeData.colorScheme;
    final MaterialLocalizations localizations =
        MaterialLocalizations.of(context);

    const OutlinedBorder buttonShape = RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(2)));
    const EdgeInsets buttonPadding = EdgeInsets.symmetric(horizontal: 16.0);

    return Container(
      margin: const EdgeInsets.only(top: 16.0),
      child: ConstrainedBox(
        constraints: const BoxConstraints.tightFor(height: 48.0),
        child: Row(
          children: <Widget>[
            TextButton(
              onPressed: widget.onStepContinue,
              style: ButtonStyle(
                foregroundColor: MaterialStateProperty.resolveWith<Color?>(
                    (Set<MaterialState> states) {
                  return states.contains(MaterialState.disabled)
                      ? null
                      : (_isDark()
                          ? colorScheme.onSurface
                          : colorScheme.onPrimary);
                }),
                backgroundColor: MaterialStateProperty.resolveWith<Color?>(
                    (Set<MaterialState> states) {
                  return _isDark() || states.contains(MaterialState.disabled)
                      ? null
                      : colorScheme.primary;
                }),
                padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
                    buttonPadding),
                shape: MaterialStateProperty.all<OutlinedBorder>(buttonShape),
              ),
              child: Text(localizations.continueButtonLabel),
            ),
            Container(
              margin: const EdgeInsetsDirectional.only(start: 8.0),
              child: TextButton(
                onPressed: widget.onStepCancel,
                style: TextButton.styleFrom(
                  primary: cancelColor,
                  padding: buttonPadding,
                  shape: buttonShape,
                ),
                child: Text(localizations.cancelButtonLabel),
              ),
            ),
          ],
        ),
      ),
    );
  }

  TextStyle _titleStyle(int index) {
    final ThemeData themeData = Theme.of(context);
    final TextTheme textTheme = themeData.textTheme;

    assert(widget.steps[index].state != null);
    switch (widget.steps[index].state) {
      case StepState.indexed:
      case StepState.editing:
      case StepState.complete:
        return textTheme.bodyText1!;
      case StepState.disabled:
        return textTheme.bodyText1!.copyWith(
          color: _isDark() ? _kDisabledDark : _kDisabledLight,
        );
      case StepState.error:
        return textTheme.bodyText1!.copyWith(
          color: _isDark() ? _kErrorDark : _kErrorLight,
        );
    }
  }

  TextStyle _subtitleStyle(int index) {
    final ThemeData themeData = Theme.of(context);
    final TextTheme textTheme = themeData.textTheme;

    assert(widget.steps[index].state != null);
    switch (widget.steps[index].state) {
      case StepState.indexed:
      case StepState.editing:
      case StepState.complete:
        return textTheme.caption!;
      case StepState.disabled:
        return textTheme.caption!.copyWith(
          color: _isDark() ? _kDisabledDark : _kDisabledLight,
        );
      case StepState.error:
        return textTheme.caption!.copyWith(
          color: _isDark() ? _kErrorDark : _kErrorLight,
        );
    }
  }

  Widget _buildHeaderText(int index) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        AnimatedDefaultTextStyle(
          style: _titleStyle(index),
          duration: kThemeAnimationDuration,
          curve: Curves.fastOutSlowIn,
          child: widget.steps[index].title,
        ),
        if (widget.steps[index].subtitle != null)
          Container(
            margin: const EdgeInsets.only(top: 2.0),
            child: AnimatedDefaultTextStyle(
              style: _subtitleStyle(index),
              duration: kThemeAnimationDuration,
              curve: Curves.fastOutSlowIn,
              child: widget.steps[index].subtitle!,
            ),
          ),
      ],
    );
  }

  Widget _buildVerticalHeader(int index) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Row(
        children: <Widget>[
          Column(
            children: <Widget>[
              _buildLine(!_isFirst(index)),
              _buildIcon(index),
              _buildLine(!_isLast(index)),
            ],
          ),
          Expanded(
            child: Container(
              margin: const EdgeInsetsDirectional.only(start: 12.0),
              child: _buildHeaderText(index),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVerticalBody(int index) {
    return Stack(
      children: <Widget>[
        PositionedDirectional(
          start: 24.0,
          top: 0.0,
          bottom: 0.0,
          child: SizedBox(
            width: 24.0,
            child: Center(
              child: SizedBox(
                width: _isLast(index) ? 0.0 : 1.0,
                child: Container(
                  color: Colors.grey.shade400,
                ),
              ),
            ),
          ),
        ),
        AnimatedCrossFade(
          firstChild: Container(height: 0.0),
          secondChild: Container(
            margin: widget.margin ??
                const EdgeInsetsDirectional.only(
                  start: 60.0,
                  end: 24.0,
                  bottom: 24.0,
                ),
            child: Column(
              children: <Widget>[
                widget.steps[index].content,
                _buildVerticalControls(index),
              ],
            ),
          ),
          firstCurve: const Interval(0.0, 0.6, curve: Curves.fastOutSlowIn),
          secondCurve: const Interval(0.4, 1.0, curve: Curves.fastOutSlowIn),
          sizeCurve: Curves.fastOutSlowIn,
          crossFadeState: _isCurrent(index)
              ? CrossFadeState.showSecond
              : CrossFadeState.showFirst,
          duration: kThemeAnimationDuration,
        ),
      ],
    );
  }

  Widget _buildVertical() {
    return ListView(
      shrinkWrap: true,
      physics: widget.physics,
      children: <Widget>[
        for (int i = 0; i < widget.steps.length; i += 1)
          Column(
            key: _keys[i],
            children: <Widget>[
              InkWell(
                onTap: widget.steps[i].state != StepState.disabled
                    ? () {
                        Scrollable.ensureVisible(
                          _keys[i].currentContext!,
                          curve: Curves.fastOutSlowIn,
                          duration: kThemeAnimationDuration,
                        );

                        widget.onStepTapped?.call(i);
                      }
                    : null,
                canRequestFocus: widget.steps[i].state != StepState.disabled,
                child: _buildVerticalHeader(i),
              ),
              _buildVerticalBody(i),
            ],
          ),
      ],
    );
  }

  Widget _buildHorizontal() {
    final List<Widget> children = <Widget>[
      for (int i = 0; i < widget.steps.length; i += 1) ...<Widget>[
        InkResponse(
          onTap: widget.steps[i].state != StepState.disabled
              ? () {
                  widget.onStepTapped?.call(i);
                }
              : null,
          canRequestFocus: widget.steps[i].state != StepState.disabled,
          child: Row(
            children: <Widget>[
              SizedBox(
                height: 72.0,
                child: Center(
                  child: _buildIcon(i),
                ),
              ),
              Container(
                margin: const EdgeInsetsDirectional.only(start: 12.0),
                child: _buildHeaderText(i),
              ),
            ],
          ),
        ),
        if (!_isLast(i))
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 8.0),
              height: 1.0,
              color: Colors.grey.shade400,
            ),
          ),
      ],
    ];

    final List<Widget> stepPanels = <Widget>[];
    for (int i = 0; i < widget.steps.length; i += 1) {
      stepPanels.add(
        Visibility(
          maintainState: true,
          visible: i == widget.currentStep,
          child: widget.steps[i].content,
        ),
      );
    }

    return Column(
      children: <Widget>[
        Material(
          elevation: widget.elevation ?? 2,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 24.0),
            child: Row(
              children: children,
            ),
          ),
        ),
        Expanded(
          child: ListView(
            physics: widget.physics,
            padding: const EdgeInsets.all(24.0),
            children: <Widget>[
              AnimatedSize(
                curve: Curves.fastOutSlowIn,
                duration: kThemeAnimationDuration,
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: stepPanels),
              ),
              _buildVerticalControls(widget.currentStep),
            ],
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    assert(debugCheckHasMaterial(context));
    assert(debugCheckHasMaterialLocalizations(context));
    assert(() {
      if (context.findAncestorWidgetOfExactType<CustomStepper>() != null)
        throw FlutterError(
          'Steppers must not be nested.\n'
          'The material specification advises that one should avoid embedding '
          'steppers within steppers. '
          'https://material.io/archive/guidelines/components/steppers.html#steppers-usage',
        );
      return true;
    }());
    assert(widget.type != null);
    switch (widget.type) {
      case StepperType.vertical:
        return _buildVertical();
      case StepperType.horizontal:
        return _buildHorizontal();
    }
  }
}

class _TrianglePainter extends CustomPainter {
  _TrianglePainter({
    required this.color,
  });

  final Color color;

  @override
  bool hitTest(Offset point) => true;

  @override
  bool shouldRepaint(_TrianglePainter oldPainter) {
    return oldPainter.color != color;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final double base = size.width;
    final double halfBase = size.width / 2.0;
    final double height = size.height;
    final List<Offset> points = <Offset>[
      Offset(0.0, height),
      Offset(base, height),
      Offset(halfBase, 0.0),
    ];

    canvas.drawPath(
      Path()..addPolygon(points, true),
      Paint()..color = color,
    );
  }
}
