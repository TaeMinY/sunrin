import { Expose } from "class-transformer";
import { User } from "src/user/entities/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Word extends BaseEntity {
  // id, word, mean, createdAt, users
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  word: string;

  @Column()
  @Expose()
  mean: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.words)
  @JoinColumn({ name: "userId" })
  users: User;
}
