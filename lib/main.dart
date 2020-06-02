import 'package:flutter/material.dart';
import 'package:portfolio/conts/theme.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'locator.dart';
import 'services/navigation/navigation_service.dart';
import 'services/navigation/router.dart';
import 'services/navigation/router_names.dart';
import 'views/main_view.dart';

void main() {
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ThemeWidget(
      themestatus: false,
      child: Main()
    );
  }
}

class Main extends StatelessWidget {
  const Main({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Fredy Acuna',
        theme: ThemeSwitcher.of(context).darkMode?darkTheme(context):lightTheme(context),
        builder: (context, child) => MainView(child: child),
        navigatorKey: locator<NavigationService>().navigatorKey,
        onGenerateRoute: generateRoute,
        initialRoute: HomeRoute,
      );
  }
}
