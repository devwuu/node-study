import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, OneToOne } from 'typeorm'
import { UserEntity } from '../users/users.entity'

@Entity({
  name: 'USER_PROFILE',
})
export class ProfileEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    nullable: true,
  })
  bio: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  site: string

  // @OneToOne(() => UserEntity) // 양방향 연관관계
  // profile: UserEntity
}
