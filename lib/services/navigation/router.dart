import 'package:flutter/material.dart';
import 'router_names.dart';
import 'package:portfolio/views/hire_me_view/hire_me_view.dart';
import 'package:portfolio/views/home_view/home_view.dart';
import 'package:portfolio/views/projects_view/projects_view.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case HireRoute:
      return _getPage(HireView(), settings);
    case HomeRoute:
      return _getPage(HomeView(), settings);
    case ProjectsRoute:
      return _getPage(ProjectsView(), settings);
    default:
      return _getPage(HomeView(), settings);
  }
}

PageRoute _getPage(Widget child, RouteSettings settings) {
  return _FadeRoute(child: child, routeName: settings.name);
}

class _FadeRoute extends PageRouteBuilder {
  final Widget child;
  final String routeName;
  _FadeRoute({this.child, this.routeName})
      : super(
          settings: RouteSettings(name: routeName),
          pageBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
          ) =>
              child,
          transitionsBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
            Widget child,
          ) =>
              FadeTransition(
            opacity: animation,
            child: child,
          ),
        );
} 