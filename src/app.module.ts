import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity'
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './temas/tema.module';
import { Tema } from './temas/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';


// arquivos module, serve para configuração

//decorator, uma etiqueta de metadados, indica o que é a classe é um module
// os decorator muda o comportamento da classe, e trás uma importancia maior
@Module({
imports: [  // Configurando o TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
