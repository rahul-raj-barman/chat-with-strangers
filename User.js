class User {
    constructor(socket) {
        this.socket = socket;
        this.partner = null;
        this.id = socket.id;
    }

    setPartner(partner) {
        this.partner = partner;
        this.socket.to(this.partner.id).emit('partner', this.partner.id)
    }

    sendMessage(message) {
        console.log('partner is ')
        if(this.partner) console.log(this.partner.id)
        if(this.partner == null) return;
        this.socket.to(this.partner.id).emit('chat message' ,message);
    }

    // receiveMessage(message) {
    //     this.socket.to(this.socket.id).emit(message);
    // }

}

module.exports = User;