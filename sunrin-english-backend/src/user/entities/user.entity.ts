import { Word } from "src/word/entities/word.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  // accountId, id, password, username, createdAt, isBlocked, words
  @PrimaryGeneratedColumn()
  accountId: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isBlocked: boolean;

  @OneToMany(() => Word, (word) => word.users)
  words: Word;
}
