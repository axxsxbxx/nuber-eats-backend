# TypeORM And Nest

## 1. decorator 사용
- decorator를 사용하면 클래스 하나로 graphQL 스키마와 DB에 저장되는 실제 데이터의 형식을 만들 수 있다.
```typescript
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(type => String)
  @Column()
  name: string;

  @Field(type => Boolean)
  @Column()
  isVegan?: boolean;

  @Field(type => String)
  @Column()
  address: string;

  @Field(type => String)
  @Column()
  ownersName: string;
}
```
- 앱 설정하기
```typescript
TypeOrmModule.forRoot({
    // prod에서는 실제 데이터를 가지고 있기 때문에 DB를 따로 migrate 하기를 원하는 경우
    synchronize: process.env.NODE_ENV !== 'prod',
    // 해당 entity 삽입
    entities: [Restaurant],
}),
```

