import { UserService } from './../user/user.service';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import WebSocket, { Server } from 'ws';
import { v4 as uuid } from 'uuid';
import { Logger, UseFilters } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { WebsocketExceptionsFilter } from './websocketExceptions';
import { omitNullAndUndefinedValues } from 'src/shared/functions';
import { getData, randomIntFromInterval } from './websocket.util';
  
  export interface WsClient extends WebSocket {
    id: string;
    email: string | string[];
    sendMessage: (message) => void;
    record: number;
  }
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  @UseFilters(WebsocketExceptionsFilter)
  export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    protected logger: Logger = new Logger('WebsocketGateway');
    public connectedClients: Map<string, WsClient> = new Map();
  
    constructor( 
        private readonly userService: UserService,
    ) {}
  
    afterInit(server: Server): void {
        this.logger.log('Initialized!');
    }
  
    async handleConnection(client: WsClient, req: IncomingMessage): Promise<void> {

        try {
            client.id = uuid();
            client.record = 0
            client.sendMessage = function (message) {
                client.send(JSON.stringify(omitNullAndUndefinedValues(message)));
            };
            client.email = req.headers['email'];
            if (!client.email) {
                client.send('Email is not provided')
                return client.close()
            };
            this.connectedClients.set(client.id, client)
            this.logger.log(`Client connected: ${ client.id }`);
        } catch (error) {
            return error
        }
    }
  
    async handleDisconnect(client: WsClient): Promise<void> {
        this.connectedClients.delete(client.id);
        this.logger.log(`Client disconnected: ${ client.id }`);
    }
  
    
    @SubscribeMessage('start')
    async startGame(
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {  
        this.connectedClients.forEach(cl => {
            if (cl.id === client.id){
                client.send('Игра началась');
                let timer = setInterval(() =>  
                    client.sendMessage({
                        data: getData()
                }), randomIntFromInterval(8000, 9000));

                setTimeout(async () => { 
                    clearInterval(timer);  
                    client.send('Игра закончена');
                    const user = await this.userService.getBy({key: 'email', value: client.email});
                    await this.userService.createRating({
                        user: user, 
                        record: client.record
                    })
                }, 30000);
            }
        });
    }

    @SubscribeMessage('record')
    async getPoints( 
        @MessageBody() payload,
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {
        client.record += payload.points;
        this.connectedClients.forEach(cl => {
            if (cl.id === client.id){
                client.send(client.record)
            }
        })
        return
    }
}

