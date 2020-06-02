import 'package:flutter/material.dart';
import 'package:portfolio/services/navigation/router_names.dart';
import 'navbar_item/navbar_item.dart';
import 'navbar_logo.dart';

class TabletDesktopNavBar extends StatelessWidget {
  const TabletDesktopNavBar({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          NavBarLogo(),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              NavBarItem('Home', HomeRoute),
              SizedBox(width: 30,),
              NavBarItem('Projects', ProjectsRoute),
              SizedBox(width: 30,),
              NavBarItem('Hire Me', HireRoute)
            ],
          )
        ],
      ),
    );
  }
}