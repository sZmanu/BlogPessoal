import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

@Injectable() // indica que a classe é de serviço e pode ser inserida/injetada em outras classes
export class PostagemService{

    constructor(

        @InjectRepository(Postagem) 
        private postagemRepository: Repository<Postagem>
        
    ){}
    async findAll(): Promise<Postagem[]> {

        return await this.postagemRepository.find()
    }

    async findById(id: number): Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where: { id }
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
            }  
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        return this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem>{
        await this.findById(postagem.id)
        return this.postagemRepository.save(postagem)
    }


}