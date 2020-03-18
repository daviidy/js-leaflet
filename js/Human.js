function Human (firstName, lastName, age, teint) {
  // Note: Don't worry about 'this' yet. You'll understand it later. Follow along for now.
  this.firstName = firstName
  this.lastName = lastName
  this.age = age
  this.teint = teint

  this.sayName = function () {
    console.log(`I am ${firstName} ${lastName}`)
  }
}

const David = new Human('dave', 'yao', 15, 'noir');
console.log(David);
