import 'package:flutter/material.dart';
import 'package:portfolio/conts/project_list.dart';
import 'package:portfolio/widgets/project_list/project_item_desktop.dart';
import 'package:portfolio/widgets/project_list/project_item_mobile.dart';
import 'package:responsive_builder/responsive_builder.dart';

class ProjectList extends StatelessWidget {
  const ProjectList({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ScreenTypeLayout(
      desktop: Align(
        alignment: Alignment.center,
        child: Wrap(
          spacing: 20,
          runSpacing: 30,
          children: <Widget>[
            ...projects.map((project) => ProjectItemDesktop(model: project))
          ],
        ),
      ),
      mobile: Column(
        children: List.generate(
          projects.length, (index) => ProjectItemMobile(projects[index], (index == projects.length - 1 ? 16.0 : 0))
        ),
      ),
    );
  }
}
