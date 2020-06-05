import 'package:flutter/material.dart';
import 'package:portfolio/widgets/nav_bar/navbar_main.dart';

class HireView extends StatelessWidget {
  const HireView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        NavBarMain(),
        SizedBox(height: 60),
        Center(child: Text("under construction..."))
      ],
    );
  }
}
