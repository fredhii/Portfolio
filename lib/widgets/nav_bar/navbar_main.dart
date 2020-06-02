import 'package:flutter/material.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'navbar_mobile.dart';
import 'navbar_tablet_desktop.dart';


class NavBarMain extends StatelessWidget {
  const NavBarMain({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ResponsiveBuilder(
      builder: (context, sizeInfo) {
        double horizontal = sizeInfo.isMobile ? 40 : 100;

        return Container(
          padding: EdgeInsets.only(
            top: 25, 
            left: horizontal,
            right: horizontal
          ),
          child: ScreenTypeLayout(
            mobile: MobileNavBar(),
            tablet: TabletDesktopNavBar(),
          )
        );
      }
    );
  }
}
