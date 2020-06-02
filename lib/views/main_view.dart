import 'package:flutter/material.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'package:portfolio/widgets/nav_bar/navbar_drawer/navbar_drawer.dart';
import 'package:responsive_builder/responsive_builder.dart';

class MainView extends StatelessWidget {
  final Widget child;
  const MainView({Key key, @required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ResponsiveBuilder(
      builder: (context, sizingInformation) => Scaffold(
        drawer: sizingInformation.isMobile
              ? NavBarDrawer()
              : null,
        body: Container(
          child: child,
        ),
        floatingActionButton: FloatingActionButton(
            onPressed: () {ThemeSwitcher.of(context).switchDarkMode();},
            child: IconButton(
              icon: ThemeSwitcher.of(context).darkMode
              ? Icon(Icons.wb_sunny, color: Colors.black)
              : Image.asset('assets/images/icons/moon.png', color: Colors.white, height: 20, width: 20)
            ),
            mini: true,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12.0))),
            backgroundColor: ThemeSwitcher.of(context).darkMode?Colors.white:Colors.black,
          )
      ),
    );
  }
}