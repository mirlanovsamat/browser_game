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
import { randomIntFromInterval, getData, validateEmail } from './websocket.util';
  
  export interface WsClient extends WebSocket {
    id: string;
    name: string;
    email: string;
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
            client.record = 0;
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
        if (!validateEmail(payload.email)) {
            client.sendMessage({message: 'Email is not valid'})
            return client.close()
        }
        if (!payload.email || !payload.name ) {
            client.sendMessage({message: 'Email or Name is not provided'})
            return client.close()
        };
        client.email = payload.email
        client.name = payload.name
        return client.sendMessage({message: 'Data saved'})
    }
    
    @SubscribeMessage('start')
    async startGame(
        @MessageBody() payload,
        @ConnectedSocket() client: WsClient,
    ): Promise<void> {  
        client.sendMessage({message: 'Start'});
        client.sendMessage({data: getData(payload), message: 'targets', record: client.record })
        setTimeout(async () => {
            await this.userService.create({name: client.name, email: client.email, record: client.record})
            client.status = false;
            client.sendMessage({message: 'End'})
        }, 60000)
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
            client.record += randomIntFromInterval(6, 8)
        } 
        if (payload && !payload.enemy ) {
            client.record -= randomIntFromInterval(6, 8)
        }
        return client.sendMessage({data: getData(payload), message: 'targets', record: client.record})
    }
}

