import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity"

@Entity({ name: "tb_postagens"}) 
export class Postagem{
   
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty() 
    @Column({ length: 100, nullable: false}) 
    titulo: string

    @IsNotEmpty() // validador de objeto
    @Column({ length: 1000, nullable: false})  
    texto: string

    //ao criar um objeto ele cria a data, e ao atualizar a data é modificada pelo proprio banco de dados
    @UpdateDateColumn()
    data: Date

   // Define um relacionamento MUITOS para UM (ManyToOne)
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE", // Garante que ao deletar um Tema, todas as Postagens associadas a ele sejam removidas automaticamente
    })
    tema: Tema // Cria o atributo "tema" na entidade atual onde sera criada uma chave estrangeira (FK) no banco de dados
}