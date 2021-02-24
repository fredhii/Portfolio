import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:portfolio/widgets/darkmode/theme_widget.dart';
import 'package:portfolio/widgets/nav_bar/navbar_main.dart';
import 'package:portfolio/widgets/social_icons/socialicons.dart';
import 'package:url_launcher/url_launcher.dart';

class HireView extends StatelessWidget {
  const HireView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[NavBarMain(), SizedBox(height: 60), ContentHireMe()],
    );
  }
}

class ContentHireMe extends StatelessWidget {
  const ContentHireMe({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.only(top: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'assets/images/hire-photo.jpg',
                height: 500,
                width: 600,
              ),
              Column(
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Tooltip(
                        message: "Whatsapp",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.whatsapp),
                          onTap: () => launch(
                              'http://api.whatsapp.com/send?phone=+573133229643'),
                        ),
                      ),
                      Tooltip(
                        message: "Linkedin",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.linkedinIn),
                          onTap: () =>
                              launch('https://www.linkedin.com/in/fredhii/'),
                        ),
                      ),
                      Tooltip(
                        message: "E-Mail",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: Icons.mail_outline),
                          onTap: () => launch(
                              'mailto:fredhiixd@gmail.com?subject=Hire&body=text...'),
                        ),
                      ),
                      Tooltip(
                        message: "Twitter",
                        child: InkWell(
                          hoverColor: ThemeSwitcher.of(context).darkMode
                              ? Colors.black
                              : Colors.white,
                          child: SocialIcon(icon: FontAwesomeIcons.twitter),
                          onTap: () => launch('https://twitter.com/Fredhii_'),
                        ),
                      ),
                    ],
                  )
                ],
              ),
              SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
