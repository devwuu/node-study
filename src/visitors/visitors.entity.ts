import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { IsIP, isIP, IsNotEmpty, isNotEmpty } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity'
import { BlogEntity } from '../blogs/blogs.entity'

@Entity({
  name: 'VISITOR',
})
export class VisitorEntity extends CommonEntity {
  @Column({
    type: 'varchar',
  })
  @IsIP()
  @IsNotEmpty()
  ip: string

  // fk
  @ManyToOne(() => BlogEntity, (blog: BlogEntity) => blog.visitor, {
    onDelete: 'SET NULL', // blog가 지워지면 해당 컬럼을 null로 정한다
  })
  @JoinColumn({
    name: 'blog_id',
    referencedColumnName: 'id',
  })
  blog: BlogEntity // 해당 ip가 방문한 블로그
}
