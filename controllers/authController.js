// Implement user registration and login logic here
// You'll interact with your database or user service to validate users
// Example:
const registeredUsers = [
    { id: 1, username: 'exampleUser', password: 'password123' }
  ];
  
  function findUserByUsername(username) {
    return registeredUsers.find(user => user.username === username);
  }
  
  function authenticateUser(username, password) {
    const user = findUserByUsername(username);
    if (user && user.password === password) {
      return { id: user.id, username: user.username };
    }
    return null;
  }
  
  module.exports = { findUserByUsername, authenticateUser };
  