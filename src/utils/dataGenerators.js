import faker from 'faker';

export class EnhancedDataGenerator {
  static numbers_random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  static numbers_float() {
    return (Math.random() * (100 - 0) + 0).toFixed(4);
  }

  static numbers() {
    return Math.ceil(Math.random() * (1000 - 0) + 0);
  }

  static date() {
    const m = this.numbers_random(1, 12);
    const d = this.numbers_random(1, 29);
    const year = this.numbers_random(2000, 2023);
    const month = m < 10 ? "0" + m : m;
    const day = d < 10 ? "0" + d : d;
    return "'" + year + "." + month + "." + day + "'";
  }

  static time() {
    const hours = this.numbers_random(0, 23);
    const minutes = this.numbers_random(0, 59);
    const seconds = this.numbers_random(0, 59);
    return "'" + hours + ":" + minutes + ":" + seconds + "'";
  }

  static dateTime() {
    const d = this.numbers_random(2000, 2023) + "." + this.numbers_random(1, 12) + "." + this.numbers_random(1, 29);
    const t = this.numbers_random(0, 23) + ":" + this.numbers_random(0, 59) + ":" + this.numbers_random(0, 59);
    return "'" + d + " " + t + "'";
  }

  // New data types
  static decimal(min = 0, max = 1000, precision = 2) {
    return (Math.random() * (max - min) + min).toFixed(precision);
  }

  static money(min = 0, max = 10000) {
    return this.decimal(min, max, 2);
  }

  static text(minLength = 10, maxLength = 100) {
    return "'" + faker.lorem.paragraph(Math.floor(Math.random() * (maxLength - minLength) + minLength)).substring(0, maxLength) + "'";
  }

  static email() {
    return "'" + faker.internet.email() + "'";
  }

  static phone() {
    return "'" + faker.phone.phoneNumber('###-###-####') + "'";
  }

  static ssn() {
    return "'" + faker.helpers.replaceSymbolWithNumber('###-##-####') + "'";
  }

  static creditCard() {
    return "'" + faker.finance.creditCardNumber() + "'";
  }

  static ipAddress() {
    return "'" + faker.internet.ip() + "'";
  }

  static url() {
    return "'" + faker.internet.url() + "'";
  }

  static username() {
    return "'" + faker.internet.userName() + "'";
  }

  static password() {
    return "'" + faker.internet.password() + "'";
  }

  static company() {
    return "'" + faker.company.companyName() + "'";
  }

  static jobTitle() {
    return "'" + faker.name.jobTitle() + "'";
  }

  static department() {
    return "'" + faker.commerce.department() + "'";
  }

  static productName() {
    return "'" + faker.commerce.productName() + "'";
  }

  static productDescription() {
    return "'" + faker.commerce.productDescription() + "'";
  }

  static price(min = 1, max = 1000) {
    return this.decimal(min, max, 2);
  }

  static isbn() {
    return "'" + faker.commerce.isbn() + "'";
  }

  static uuid() {
    return "'" + faker.datatype.uuid() + "'";
  }

  static macAddress() {
    return "'" + faker.internet.mac() + "'";
  }

  static color() {
    return "'" + faker.internet.color() + "'";
  }

  static domain() {
    return "'" + faker.internet.domainName() + "'";
  }

  static streetAddress() {
    return "'" + faker.address.streetAddress() + "'";
  }

  static city() {
    return "'" + faker.address.city() + "'";
  }

  static state() {
    return "'" + faker.address.state() + "'";
  }

  static zipCode() {
    return "'" + faker.address.zipCode() + "'";
  }

  static country() {
    return "'" + faker.address.country() + "'";
  }

  static latitude() {
    return faker.address.latitude();
  }

  static longitude() {
    return faker.address.longitude();
  }

  static coordinates() {
    return `'${this.latitude()}, ${this.longitude()}'`;
  }

  // Legacy methods for backward compatibility
  static getName(radio) {
    return "'" + faker.name.firstName() + "'";
  }

  static getLastName(radio) {
    return "'" + faker.name.lastName() + "'";
  }

  static getCity(radio) {
    return "'" + faker.address.city() + "'";
  }

  static getCountry(radio) {
    return "'" + faker.address.country() + "'";
  }

  static getSample(radio) {
    return "'" + faker.lorem.word() + "'";
  }


}

export default EnhancedDataGenerator;