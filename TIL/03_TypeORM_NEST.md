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

## 3. Create Method
> `Method` : class안에 있는 function
- `create`는 DB를 전혀 건들이지 않고 새로운 instance를 생성한다.
- DB에 저장하고 싶다면 `save` method를 사용해야 한다.
- entity에는 추가했는데, dto에 해당 컬럼을 추가하지 않는다면 에러가 발생한다.
  - 이럴 때 `Mapped Type`을 사용한다. [Mapped Type](https://docs.nestjs.com/graphql/mapped-types)
  - Type 종류가 일치하지 않을 때 에러가 발생하는데, 해결 방안은 두가지가 있다.
    - Mapped Type의 인자로 타입 종류를 넘겨준다.
    - entity에 `@InputType({ isAbstract: true })` 데코레이터를 추가한다.