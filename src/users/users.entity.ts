import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { CommonEntity } from '../common/entities/common.entity' // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Exclude } from 'class-transformer'
import { BlogEntity } from '../blogs/blogs.entity'
import { ProfileEntity } from '../profiles/profiles.entity'

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'USER',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  username: string

  @Exclude() // serialize 할 때 해당 필드는 제외한다 그래서 혹시 응답에 해당 필드가 포함되는 일이 없도록 한다
  @Column({ type: 'varchar', nullable: false })
  password: string

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean

  //* Relation */

  @OneToOne(() => ProfileEntity) // 단방향 연결(하나의 entity에 작성), 양방향도 가능(두개의 entity에 작성)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' }) // 조인컬럼은 한 쪽에만 작성한다 name은 내 테이블에 저장될 컬럼 이름, referencedColumnName 은 상대편 테이블 컬럼 이름
  profile: ProfileEntity

  // inverseSide : 상대편 Entity를 받아서 맵핑될 필드를 넣어준다
  // 다대일, 일대다 관계에서 필수
  @OneToMany(() => BlogEntity, (blog: BlogEntity) => blog.author, {
    cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
  })
  blogs: BlogEntity[] // 가상컬럼. 실제 DB에 저장되진 않는다
}

/*
const author = await User.findOne( { id: '...' } )
author.blogs.push(new BlogEntity(...))
await author.save()
*/
