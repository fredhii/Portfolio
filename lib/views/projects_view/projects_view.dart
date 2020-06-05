import 'package:flutter/material.dart';
import 'package:portfolio/widgets/nav_bar/navbar_main.dart';
import 'package:portfolio/widgets/project_list/project_list.dart';

class ProjectsView extends StatelessWidget {
  const ProjectsView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        NavBarMain(),
        SizedBox(height: 40),
        Center(child: Text("Projects", style: TextStyle(fontWeight: FontWeight.w600), textScaleFactor: 3)),
        SizedBox(height: 40),
        ProjectList(),
        SizedBox(height: 20)
      ],
    );
  }
}
