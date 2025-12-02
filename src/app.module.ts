import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity'
import { PostagemModule } from './postagem/postagem.module';


// arquivos module, serve para configuração

//decorator, uma etiqueta de metadados, indica o que é a classe é um module
// os decorator muda o comportamento da classe, e trás uma importancia maior
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule  // é necessario adicionar os modules tambem
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
