import 'package:flutter/material.dart';
import 'package:portfolio/conts/datamodels/navbar_item_model.dart';
import 'package:stacked/stacked.dart';

class NavBarItemTabletDesktop extends ViewModelWidget<NavBarItemModel> {

  @override
  Widget build(BuildContext context, NavBarItemModel model) {
    return Text(
      model.title,
      style: TextStyle(fontSize: 18),
    );
  }
}
