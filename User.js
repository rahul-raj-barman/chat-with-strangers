class User {
    constructor(socket) {
        this.socket = socket;
        this.partner = null;
        this.id = socket.id;
        this.username = socket.handshake.query.username
    }

    setPartner(partner) {
        console.log("yees")
        this.partner = partner;
        this.socket.to(this.partner.id).emit('partner', this.username)
    }

    sendMessage(message) {
        console.log('partner is ')
        if(this.partner) console.log(this.partner.id)
        if(this.partner == null) return;
        this.socket.to(this.partner.id).emit('chat message' ,message);
    }

}

module.exports = User;