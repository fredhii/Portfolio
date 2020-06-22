import 'package:flutter/material.dart';
import 'package:portfolio/services/navigation/navigation_service.dart';
import 'package:portfolio/services/navigation/router_names.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';

import '../../locator.dart';

class NavBarLogo extends StatelessWidget {
  const NavBarLogo({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: InkWell(
        onTap: () {
          locator<NavigationService>().navigateTo(HomeRoute);
        },
        child: Image.asset('assets/images/logo.png', 
                            color: ThemeSwitcher.of(context).darkMode ? Colors.white : Colors.black,
                            height: 50, width: 50)
      )
    );
  }
}