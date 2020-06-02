import 'package:flutter/material.dart';
import 'package:portfolio/services/navigation/router_names.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'package:portfolio/widgets/nav_bar/navbar_item/navbar_item.dart';
import 'navbar_drawer_header.dart';


class NavBarDrawer extends StatelessWidget {
  const NavBarDrawer({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor,
        boxShadow: [
          BoxShadow(
            color: ThemeSwitcher.of(context).darkMode?Colors.white:Colors.black12,
            blurRadius: 16
          ),
        ]
      ),
      child: Column(
        children: <Widget>[
          NavBarDrawerHeader(),
          NavBarItem('Home', HomeRoute, icon: Icons.home),
          NavBarItem('Projects', ProjectsRoute, icon: Icons.ac_unit),
          NavBarItem('Hire Me', HireRoute, icon: Icons.code),
        ],
      ),
    );
  }
}
