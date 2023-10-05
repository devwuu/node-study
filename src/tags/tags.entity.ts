import { CommonEntity } from '../common/entities/common.entity'
import { Column, Entity, ManyToMany } from 'typeorm'
import { BlogEntity } from '../blogs/blogs.entity'

@Entity({
  name: 'TAG',
})
export class TagEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

  // join table
  // blog 에서 조인 테이블을 만들었기 때문에 이 entity에선 조인 테이블 데코레이터를 사용할 필요가 없다
  // blog entity 말고 tag entity에서 조인 테이블을 만들고 blog에서는 제거해도 상관 없음
  @ManyToMany(() => BlogEntity, (blog: BlogEntity) => blog.tags, {
    cascade: true,
  })
  blog: BlogEntity[]
}
