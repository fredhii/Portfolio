import 'package:flutter/material.dart';
import 'package:portfolio/conts/datamodels/navbar_item_model.dart';
import 'package:portfolio/services/navigation/navigation_service.dart';
import 'package:provider/provider.dart';
import 'package:responsive_builder/responsive_builder.dart';
import '../../../locator.dart';
import 'navbar_item_mobile.dart';
import 'navbar_item_tablet_desktop.dart';
import '../../on_hover/on_hover_mouse_changer.dart';


class NavBarItem extends StatelessWidget {
  final String title;
  final String navigationPath;
  final IconData icon;
  const NavBarItem(this.title, this.navigationPath, {this.icon});

  @override
  Widget build(BuildContext context) {
    var model = NavBarItemModel(
      title: title,
      navigationPath: navigationPath,
      iconData: icon,
    );
    return GestureDetector(
      onTap: () {
        locator<NavigationService>().navigateTo(navigationPath);
      },
      child: Provider.value(
        value: model, 
        child: ScreenTypeLayout(
          tablet: NavBarItemTabletDesktop(),
          mobile: NavBarItemMobile(),
        ).showCursorOnHover.moveUpOnHover,
      )
    );
  }
}