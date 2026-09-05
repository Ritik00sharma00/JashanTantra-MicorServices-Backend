import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  requestedBy!: string;

  @Column()
  toOrganizer!: string;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  eventDate!: Date | null;

  @Column({ type: 'text', nullable: true, default: null })
  about!: string | null;

  @Column({ type: 'text', nullable: true, default: null })
  requirements!: string | null;

  @Column({ type: 'json', nullable: true, default: null })
  reviews!: { username?: string; text?: string }[] | null;

  @Column({ type: 'text', nullable: true, default: null })
  additionalDetails!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
