import { Message } from "src/message/entities/message.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[]

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}