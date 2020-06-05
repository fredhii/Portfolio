import 'package:flutter/material.dart';
import 'package:portfolio/conts/datamodels/project_item_model.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:portfolio/widgets/on_hover/on_hover_mouse_changer.dart';

class ProjectItemMobile extends StatelessWidget {
  final ProjectItemModel model;
  final double _bottomPadding;
  ProjectItemMobile(this.model,this._bottomPadding );

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final height = MediaQuery.of(context).size.height;
    return Card(
        margin: EdgeInsets.fromLTRB(16.0,16.0,16.0,_bottomPadding),
        child:InkWell(
          onTap: () {launch(model.link);},
          child:  Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Expanded(
                  flex: 40,
                  child: Image.asset(
                    model.imagePath,
                    width: width * .25,
                    height: width * .25,
                  )),
              Expanded(
                flex: 3,
                child: Container(),
              ),
              Expanded(
                flex: 60,
                child: Container(
                  padding: EdgeInsets.only(top: 8.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(model.title,
                          style: Theme.of(context).textTheme.headline6),
                      SizedBox(
                        height: height * .01,
                      ),
                      Text(
                        model.language,
                        textScaleFactor: 1.2,
                        style: Theme.of(context).textTheme.caption,
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    ).showCursorOnHover.moveUpOnHover;
  }
}
