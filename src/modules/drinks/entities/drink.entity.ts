import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('drink')
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @Column({ nullable: false, length: 128, unique: true })
  public name: string;

  @Column('decimal', { nullable: false, precision: 5, scale: 2 })
  public price: number;

  @Column({ nullable: false, type: String })
  public imageUrl: string;
}
