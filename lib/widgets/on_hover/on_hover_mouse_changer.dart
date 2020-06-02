import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'on_hover.dart';

extension HoverExtensions on Widget {

  Widget get showCursorOnHover {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: this
    );
  }

  Widget get moveUpOnHover {
    return TranslateOnHover(
      child: this,
    );
  }
}
