const User = require('./User')

class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(socket) {
        console.log('new user request')
        const user  = new User(socket)
        this.users.push(user)
        this.pairUsers()
        return user;
    }

    removeUser(user) {

        console.log('the removed partner is.')
        if(user.partner) {
            user.socket.to(user.partner.id).emit('partner-left')
            this.users.push(user.partner)
        }
        else {
            this.users = this.users.filter((e) => e.id != user.id)
        }

        this.pairUsers()

    }

    pairUsers() {
        console.log('current user is ', this.users.length)
        if(this.users.length > 1) {
            console.log('pairing users')
            const user1 = this.users.pop();
            const user2 = this.users.pop();

            user1.setPartner(user2);
            user2.setPartner(user1);

            
            console.log('user paired')
            

        }
    }


}

module.exports =  UserManager;