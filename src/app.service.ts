import { Injectable } from '@nestjs/common';

// é o arquivo na onde vai a lógica
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
