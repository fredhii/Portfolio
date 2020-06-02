import 'package:flutter/material.dart';


class SocialIcon extends StatelessWidget {
  final IconData icon;
  
  const SocialIcon({Key key, this.icon}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 50,
      margin: EdgeInsets.only(left: 20),
      child: Center(
        child: Icon(icon)
      ),
    );
  }
}
