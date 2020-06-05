class ProjectItemModel {
  final String title;
  final String language;
  final String imagePath;
  final String link;

  ProjectItemModel({
    this.title,
    this.language,
    this.imagePath,
    this.link
  });

  ProjectItemModel.fromJson(Map<String, dynamic> map)
    : title = map['title'],
      language = map['language'],
      imagePath = map['imagePath'],
      link = map['link'];
}