let GameService = require('../GameHandlerandservice/GameService');

let GameRulesModel = require('../GameHandlerandservice/GameRulesModel.js');
let UNOClient = require('../Client/UNOClient.js');
let UNOClientRepository = require('../Client/UNOClientRepository.js');
let MessageRepository = require('../Message/MessageRepository.js');
let LoginActionHandler = require('../GameHandlerandservice/LoginActionHandler.js');
let BeginActionHandler = require('../GameHandlerandservice/BeginActionHandler.js');
let PlaceCardActionHandler = require('../card/PlaceCardActionHandler.js');
let TakeCardActionHandler = require('../GameHandlerandservice/TakeCardActionHandler.js');
let ClientResponseBuilder = require('../Client/ClientResponseBuilder.js');

module.exports = class UNOGameService extends GameService{
    constructor(id) {
        super(id, new MessageRepository(), new UNOClientRepository());
        
        this.gameRulesModel = new GameRulesModel(this.getClientRepository());
        this.clientResponseBuilder = new ClientResponseBuilder(this.getClientRepository(), this.getGameRulesModel());

        this.actionHandlers.login = new LoginActionHandler(this);
        this.actionHandlers.begin = new BeginActionHandler(this);
        this.actionHandlers.place = new PlaceCardActionHandler(this);
        this.actionHandlers.take = new TakeCardActionHandler(this);
    }
    getClientResponseData(socketId){
        let client = this.getClientRepository().findBySocketId(socketId);
        if(client instanceof UNOClient) {
            return this.clientResponseBuilder.build(client);
        }
        return false;
    }   
    getGameRulesModel(){
        return this.gameRulesModel;
    }    
};