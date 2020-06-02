import 'package:flutter/material.dart';

class NavBarDrawerHeader extends StatelessWidget {
  const NavBarDrawerHeader({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 160,
      color: Theme.of(context).primaryColor,
      alignment: Alignment.center,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          SizedBox(height: 20),
          Text(
            'MENU',
            style: TextStyle(
                fontSize: 18, fontWeight: FontWeight.w800),
          ),
          SizedBox(height: 10),
          Image.asset('images/cat.png'),
        ],
      ),
    );
  }
}
