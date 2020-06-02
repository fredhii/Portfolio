import 'package:flutter/material.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'navbar_logo.dart';

class MobileNavBar extends StatelessWidget {
  const MobileNavBar({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 70,
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu, color: ThemeSwitcher.of(context).darkMode?Colors.white:Colors.black),
            onPressed: () => Scaffold.of(context).openDrawer()
          ),
          NavBarLogo()
        ],
      ),
    );
  }
}