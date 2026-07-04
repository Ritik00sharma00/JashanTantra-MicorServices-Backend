import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({
        unique: true,
    })
    email!: string;

  @Column()
    password!: string;

  @Column()
    name!: string;


   @Column({ nullable: true, default: null })
    category!: string | null;

   @Column({ nullable: true, default: null })
    age!: string | null;

   @Column({ nullable: true, default: null })
    state!: string | null;

   @Column({ nullable: true, default: null })
    city!: string | null;

   @Column({ nullable: true, default: null })
    about!: string | null;

   @Column({ nullable: true, default: null })
    phoneNumber!: string | null;

   @Column({ nullable: true, default: null })
    address!: string | null;

   @Column({ type: 'json', nullable: true, default: null })
    reviews!: { username?: string; text?: string }[] | null;

   @Column({ type: 'json', nullable: true, default: null })
    posts!: { photos?: string[]; text?: string }[] | null;

   @Column({ default: false, nullable: true })
    emailVerified!: boolean | null;

   @Column({ default: false, nullable: true })
    emailHidden!: boolean | null;

   @Column({ default: false, nullable: true })
    contactHidden!: boolean | null;

  @Column({ nullable: true, default: null })
    role!: string | null;

  @Column({
        default: true,
    })
    isActive!: boolean;



   @Column({
        default: true,
    })
    isVerified!: boolean;

  

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}