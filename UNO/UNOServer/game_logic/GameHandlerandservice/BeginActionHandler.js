let GameActionHandler = require('../GameHandlerandservice/GameActionHandler.js');
let UNOClient = require('../Client/UNOClient.js');

/**
 * Used by GameService to handle user ready state action
 * @type {module.BeginActionHandler}
 */

// a class name BeginActionHandler extends GameActionHandler
module.exports = class BeginActionHandler extends GameActionHandler{
    constructor(gameService){
        super(gameService);
    }
    // the method takes data as a parameter and uses the data to set the client ready stat
    handleAction(data){
        let clinet_name = data.client.name;
        let client = this.getGameService().getClientRepository().findByName(clinet_name);
        
        if(client instanceof UNOClient && !client.getReady()){
            client.setReady(true);
        }
        if(!this.getGameService().getClientRepository().findByReady(false)
            &&  this.getGameService().getClientRepository().count() > 1
        ){
            this.getGameService().getGameRulesModel().deal();
        }
        return true;
    }
};