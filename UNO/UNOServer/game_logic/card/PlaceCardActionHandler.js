let GameActionHandler = require('../GameHandlerandservice/GameActionHandler.js');
let UNOClient = require('../Client/UNOClient.js');

module.exports = class PlaceCardActionHandler extends GameActionHandler {
    constructor(gameService){
        super(gameService);
    }
    handleAction(data){
        let client = this.getGameService().getClientRepository().findByName(data.client.name);
        if(client instanceof UNOClient){
            this.getGameService().getGameRulesModel().place(client, data.card);            
        }
        return true;
    }
};