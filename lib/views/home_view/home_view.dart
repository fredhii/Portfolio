import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'package:portfolio/widgets/nav_bar/navbar_main.dart';
import 'package:portfolio/widgets/social_icons/socialicons.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeView extends StatelessWidget {
  const HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[NavBarMain(), ContentHome()],
    );
  }
}

class ContentHome extends StatelessWidget {
  const ContentHome({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Center(
      child: Padding(
        padding: const EdgeInsets.only(top: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            CircleAvatar(
              radius: 100,
              backgroundImage: Image.asset('assets/images/home.png').image,
            ),
            SizedBox(height: 20),
            Text('Fredy Acuña', textScaleFactor: 4),
            SizedBox(height: 20),
            Text(
              'Full-Stack Software Engineer, Flutter Developer\nData Analyst, Growth Hacker\nWant-To-Be Mars Explorer',
              style: Theme.of(context).textTheme.caption,
              textScaleFactor: 1.5,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Tooltip(
                        message: "Github",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.github),
                          onTap: () => launch('https://github.com/fredhii'),
                        )),
                    Tooltip(
                        message: "Linkedin",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.linkedinIn),
                          onTap: () =>
                              launch('https://www.linkedin.com/in/fredhii/'),
                        )),
                    Tooltip(
                        message: "E-Mail",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: Icons.mail_outline),
                          onTap: () => launch(
                              'mailto:fredhiixd@gmail.com?subject=Hire&body=text...'),
                        )),
                    Tooltip(
                        message: "Twitter",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.twitter),
                          onTap: () => launch('https://twitter.com/Fredhii_'),
                        )),
                    Tooltip(
                        message: "Medium",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.mediumM),
                          onTap: () => launch('https://medium.com/@fredhii'),
                        ))
                  ],
                )
              ],
            ),
            SizedBox(height: 40)
          ],
        ),
      ),
    ));
  }
}
