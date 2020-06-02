import 'package:flutter/material.dart';

class ThemeSwitcher extends InheritedWidget {
  final _ThemeWidgetState data;

  const ThemeSwitcher({Key key, @required Widget child, @required this.data}) : assert(child != null), super(key: key, child: child);

  static _ThemeWidgetState of(BuildContext context) {
    return (context.dependOnInheritedWidgetOfExactType<ThemeSwitcher>()).data;
  }

  @override
  bool updateShouldNotify( ThemeSwitcher oldWidget) {
    return this != oldWidget;
  }
}

class ThemeWidget extends StatefulWidget {
  final bool themestatus; /* Initial theme status */
  final Widget child;
  ThemeWidget({Key key, this.themestatus, this.child})
      : assert(themestatus != null),
        assert(child != null),
        super(key: key);

  @override
  _ThemeWidgetState createState() => _ThemeWidgetState();
}

class _ThemeWidgetState extends State<ThemeWidget> {
  bool darkMode;

  void switchDarkMode() { /* Method to change dark mode during app runtime */
    setState(() {
      darkMode = !darkMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    darkMode = darkMode ?? widget.themestatus; /* Builds widget tree */
    return ThemeSwitcher(
       data: this,
       child: widget.child
    );
  }
}