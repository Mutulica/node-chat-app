const expect = require('expect');
const {Users} = require('./users');


describe('Users class', () =>{
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {id: '1', name: 'Jen', room: 'room1'},
      {id: '2', name: 'Sebastian', room: 'room1'},
      {id: '3', name: 'Bastian', room: 'room3'}

    ]
  });

  it('should return the user obj', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Sebastian',
      room: 'room1'
    };
    var getUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {

    var user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should Not remove a user', () => {
    var user = users.removeUser('4');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var user = users.getUser('2');
    expect(user.id).toBe('2');
  });

  it('should NOT find a user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('Should return names for room1', () => {
    var userList = users.getUserList('room1');
    expect(userList).toEqual(['Jen', 'Sebastian']);
  });
  it('Should return names for room2', () => {
    var userList = users.getUserList('room3');
    expect(userList).toEqual(['Bastian']);
  });
});
