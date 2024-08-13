const User = require('./User')

class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(socket) {
        const user = new User(socket);
        this.users.push(user);
        this.pairUsers();
        return user;
    }

    removeUser(socket) {
        this.users = this.users.filter(e => e.id === socket.id);
    }

    pairUsers() {
        if(this.users.length > 1) {
            const user1 = this.users.pop();
            const user2 = this.users.pop();

            user1.setPartner(user2);
            user2.setPartner(user1);

            console.log(user1.id);
            console.log(user2.id);

            console.log('user paired')
            

        }
    }


}

module.exports =  UserManager;