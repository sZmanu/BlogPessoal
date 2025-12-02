import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

}