import 'package:flutter/material.dart';
import 'package:portfolio/conts/datamodels/project_item_model.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:portfolio/widgets/on_hover/on_hover_mouse_changer.dart';

class ProjectItemDesktop extends StatelessWidget {
  final ProjectItemModel model;
  const ProjectItemDesktop({Key key, this.model}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {launch(model.link);},
      child: Card(
        elevation: 2,
        child: SizedBox(
          width: 360,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Center(child: SizedBox(
                height: 180,
                child: Image.asset(model.imagePath, fit: BoxFit.fitWidth),
              )),
              
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 15.0,
                  vertical: 20,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      model.title,
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                      ),
                      softWrap: true,
                    ),
                    Text(
                      model.language,
                      style: TextStyle(fontSize: 10),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      )
    ).showCursorOnHover.moveUpOnHover;
  }
}