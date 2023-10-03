import { Column, Entity } from 'typeorm'

@Entity({
  name: 'VISITOR',
})
export class VisitorEntity {
  @Column({
    type: 'varchar',
  })
  ip: string

  // fk
  blog: string
}
