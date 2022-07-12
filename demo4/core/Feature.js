
class Feature {
  constructor(type) {
    this.name = 'Feature';
    this.type = type || '';
  }
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
}

export default Feature;
