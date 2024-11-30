import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { RolesEnum } from '../../../common/enums/roles.enum';
import { MealEntity } from "../../meals/entities/meal.entity";

@Entity('user')
export class  UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @Column({ nullable: false, length: 128, unique: true })
  public name!: string;

  @Column({ nullable: false, length: 128, unique: true })
  public email!: string;

  @Column({ nullable: false, length: 60 })
  public password!: string;

  @Column({ nullable: false, type: 'simple-array' })
  public roles!: RolesEnum[];

  @OneToMany(() => MealEntity, (meal) => meal.user)
  public meals!: MealEntity[];
}
