let GameActionHandler = require('../GameHandlerandservice/GameActionHandler.js');
let UNOClient = require('../Client/UNOClient.js');
let Message = require('../Message/Message.js');

/**
 * Used by GameService to handle user login action
 * @type {module.LoginActionHandler}
 */
module.exports = class LoginActionHandler extends GameActionHandler {
    constructor(gameService){
        super(gameService);
    }
    handleAction(data){

        

        let cr = this.getGameService().getClientRepository();

        
        if(cr.findByReady(false) || cr.count() < 2){

            let client = cr.findByName(data.client.name);
            if(!client){
            
               
                let cl = new UNOClient(data.client.name);
                cl.setSocketId(data.socketId);
                client = cr.insert(cl);
            
            }
        }else{
            this.getGameService().getMessageRepository().insert(new Message('error', 'Game has already started', data.socketId));
        }
    }
};