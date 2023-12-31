class Character {
  name;
  eyeColor;
  hairColor;
  hasBeard;
  hasGlasses;

  constructor(name, eyeColor, hairColor, hasBeard, hasGlasses) {
    this.name = name;
    this.eyeColor = eyeColor;
    this.hairColor = hairColor;
    this.hasBeard = hasBeard;
    this.hasGlasses = hasGlasses;
  }

  matchesFeature(featureName, featureValue) {
    switch (featureName) {
      case "hairColor":
        return this.hairColor === featureValue;
      case "eyeColor":
        return this.eyeColor === featureValue;
      case "hasBeard":
        return this.hasBeard === featureValue;
      case "hasGlasses":
        return this.hasGlasses === featureValue;
      default:
        return false;
    }
  }

  toString() {
    return `Name: ${this.name}; Hair color: ${this.hairColor}; Eye color: ${this.eyeColor}; Beard: ${this.hasBeard}; Glasses: ${this.hasGlasses}`;
  }
}

module.exports = { Character };
