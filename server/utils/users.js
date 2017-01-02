[{
  id: '',
  name: 'Gurpreet',
  room: 'The office fans'
}];

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = {id, name, room}; //es6
    this.users.push(user);
    return user;
  }
  getUser(id){
    var users = this.users.filter((user) => user.id === id);
    return users[0];
  }
  removeUser(id) {
    //var user = this.users.filter((user) => user.id === id);
    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUserList(room){
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);
      return namesArray;
  }
}

module.exports = {Users};



// class Person {
//   constructor (name, age) {
//     console.log
//   }
// }
//
// var me = new Person('Gurpreet', 25);
