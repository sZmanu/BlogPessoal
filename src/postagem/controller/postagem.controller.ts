import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";

@Controller("/postagens") 
export class PostagemController{
   
    constructor(private readonly postagemService: PostagemService){ }

    @Get()
    @HttpCode(HttpStatus.OK) 
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id)
    }
    
    @Get("/titulo/:titulo")
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) //201
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK) //200
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204, ele fala que foi excluido com sucesso, porem nao 
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postagemService.delete(id)

    }

}