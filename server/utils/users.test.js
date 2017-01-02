const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

var users;
beforeEach(()=> {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Test'
    },
    {
      id: '2',
      name: 'Gurpreet',
      room: 'Test2'
    },
    {
      id: '3',
      name: 'Onkar',
      room: 'Test'
    }]

})

  it('should add new user', ()=> {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Gurpreet',
      room: 'The office fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });


  it('should return names for Test room', ()=> {
    var userList = users.getUserList('Test');
    expect(userList).toEqual(['Mike', 'Onkar']);
  });
  it('should return names for Test2 room', ()=> {
    var userList = users.getUserList('Test2');
    expect(userList).toEqual(['Gurpreet']);
  });

  it('should remove a user', ()=> {
    var user = users.removeUser('1');
    expect(users).toExclude({id: '1', name: 'Mike', room: 'Test'});
    expect(user).toEqual({id: '1', name: 'Mike', room: 'Test'});
  });

  it('should not remove a user', ()=> {
    var length = users.length;
    var user = users.removeUser(4);
    expect(length).toBe(users.length);
    expect(user).toNotExist();
  });

  it('should find user', ()=> {
    var user = users.getUser('1');
    expect(user).toEqual({id: '1', name: 'Mike', room: 'Test'});
  });

  it('should not find user', ()=> {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });



});
