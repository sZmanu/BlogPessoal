import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// controller recebe as requisições e apartir dai ele irá definir a rota que precisa ser feita, que no caso irá indicar qual metodo na service precisa ser executado 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
