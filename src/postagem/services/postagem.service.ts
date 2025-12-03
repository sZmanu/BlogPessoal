import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() // indica que a classe é de serviço e pode ser inserida/injetada em outras classes
export class PostagemService{

    constructor(

        @InjectRepository(Postagem) 
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
        
    ){}
    async findAll(): Promise<Postagem[]> {

        return await this.postagemRepository.find({
            relations:{
                tema: true
            }
        })
    }

    async findById(id: number): Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where: { 
                id 
            },
            relations:{
                tema: true
            }
        })

        if(!postagem){
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        }
        return postagem
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{
                  titulo: ILike(`%${titulo}%`) //ILike = Insentive Like, onde nao irá ter diferença de maiuscula e minuscula
            },
            relations: {
                tema: true
            }

        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        await this.temaService.findById(postagem.tema.id) // antes de persistir os dados é preciso verificar se o tema existe

        return this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem>{
        let busca = await this.findById(postagem.id) //primeiro procura a postagem

        await this.temaService.findById(postagem.tema.id)

        if(!busca || !postagem){
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND) // se a postagem nao existir, é gerado uma exceção
        }

        return await this.postagemRepository.save(postagem) //se existir a postagem é salva
        
    }

    async delete(id: number): Promise<DeleteResult>{ //ele nao retorna uma postagem, ele retorna o resultado de uma exclusão
        let busca = await this.findById(id)

         if (!busca){
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
    }
        return await this.postagemRepository.delete(id)
    }
       



}