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
    status: boolean;
  }
  
  @WebSocketGateway({
    path: '/api/ws',
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
            client.record = 100;
            client.status = true;
            client.sendMessage = function (message) {
                client.send(JSON.stringify(omitNullAndUndefinedValues(message)));
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
    
    @SubscribeMessage('email')
    async email(
        @MessageBody() payload,
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {  
        if (!payload.email) {
            client.sendMessage({message: 'Email is not provided'})
            return client.close()
        };
        client.email = payload.email
        return client.sendMessage({message: client.email})
    }
    
    @SubscribeMessage('start')
    async startGame(
        @MessageBody() payload,
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {  
        client.sendMessage({message: 'Start'});
        client.sendMessage({data: getData(payload)})
        setTimeout(async () => {
            const user = await this.userService.getBy({key: 'email', value: client.email});
            await this.userService.createRating({
                user: user, 
                record: client.record
            })
            client.status = false;
            client.sendMessage({message: 'End'})
        }, 60300)
    }

    @SubscribeMessage('record')
    async getPoints( 
        @MessageBody() payload,
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {
        if(!client.status) {
            return client.sendMessage({message: 'Your game is over'})
        }
        if (payload && payload.enemy) {
            client.record += randomIntFromInterval(5, 8)
        } 
        if (payload && !payload.enemy ) {
            client.record -= 5
        }
        return client.sendMessage({data: getData(payload), message: client.record})
    }
}

