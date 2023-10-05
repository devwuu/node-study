import { CommonEntity } from '../common/entities/common.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { UserEntity } from '../users/users.entity'
import { TagEntity } from '../tags/tags.entity'
import { JoinTable } from 'typeorm/browser'
import { VisitorEntity } from '../visitors/entities/visitor.entity'

@Entity({
  name: 'BLOG', // 테이블명
})
export class BlogEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  contents: string

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
    cascade: true, // blog가 저장되거나 삭제될 때 visitor도 같이 저장되거나 삭제된다
  })
  visitor: VisitorEntity[]

  // join table

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blog, {
    cascade: true, // 블로그가 저장, 삭제 되면 태그도 저장, 삭제 된다
  })
  @JoinTable({
    // 조인 테이블에 대한 옵션
    name: 'BLOG_TAG', // 테이블 이름
    // 내 테이블과 관련된 연관 관계 옵션
    // name: 조인 테이블에서 사용할 컬럼 이름, referencedColumnName: 참조 컬럼
    joinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    // 상대편 테이블과 관련된 연관 관계 옵션
    // name: 조인 테이블에서 사용할 컬럼 이름, referencedColumnName: 참조 컬럼
    inverseJoinColumn: { name: 'blog_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[]

  // fk
  // user.blogs와 blog.author와 양방향 연결
  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    onDelete: 'CASCADE', // 사용자가 삭제되면 blog도 삭제된다
  })
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }]) // fk 정보
  author: UserEntity
}
