import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // inicializa o projeto nest, e armazena isso em uma const
  const app = await NestFactory.create(AppModule);

  //configura o fuso horario do banco de dados
  process.env.TZ = '-03:00'

  // valida as requisições
  app.useGlobalPipes(new ValidationPipe())

  // ativa o cors, para que o back possa receber requisições do front
  app.enableCors();

  // aqui é definido a porta
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
