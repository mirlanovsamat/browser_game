import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as WebSocket;
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    client.send(
      JSON.stringify({
        event: 'error',
        data: { message: error },
      }),
    );
  }
}
