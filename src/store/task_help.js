export default class Task {
  constructor(name, description, category, date, color, id = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.date = date;
    this.color = color;
  }
}
