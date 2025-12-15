import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // inicializa o projeto nest, e armazena isso em uma const
  const app = await NestFactory.create(AppModule);

  // Indicamos a configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Manuella Alves de Oliveira", "https://github.com/", "manuellaalvesdeoliveira62@gmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

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
