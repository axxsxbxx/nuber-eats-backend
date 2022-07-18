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

## 2. Inject Repository
- `module`에서 `entity`를 import 한다.
  - `forFeature`은 TypeOrmModule이 특정 feature를 import할 수 있게 해준다.
```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantResolver, RestaurantService],
})
```
- `service`를 작성한다.
```typescript
@Injectable()
export class RestaurantService {
  constructor(
    // 괄호 안에는 entity가 들어가야만 한다.
    @InjectRepository(Restaurant)
    // restaurants는 Restaurant의 repository이다 -- Data Mapper 형식에서의 repository
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
}
```
- `resolver`에 `service`를 import한다.
  - `service`는 `module`의 `providers`에도 추가되어야 class에 inject할 수 있다.(위의 코드 참고)
```typescript
constructor(private readonly restaurantService: RestaurantService) {}
```