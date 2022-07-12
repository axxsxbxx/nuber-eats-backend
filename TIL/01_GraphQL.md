# GraphQL API

## 1. Apollo Server 설치하기
```bash
npm i @nestjs/graphql@^8 graphql@^15 apollo-server-express@^2
```

## 2. eslint endOfLine 에러 해결하기
- `.eslintrc.js` 파일에 아래와 같이 추가한다.
```javascript
rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      }
    ],
  },
  ```

  ## 3. 괄호 해결하기
  - `.prettierrc` 파일에 아래와 같이 추가한다.
  ```javascript
  {  
    "arrowParens": "avoid",
  }
  ```

  ## 4. Argument 받는 방법(#1.4)
  ### 1) `@Args` 사용
  ```typescript
    @Args('name') name: string,
    @Args('isVegan') isVegan: boolean,
    @Args('address') address: string,
    @Args('ownersName') ownersName: string,
  ```

### 2) 하나의 argument를 가지는 방법
- DTO object를 만든다.
- InputType을 만든다.

### 3) `ArgsType`의 클래스 생성
```typescript
@ArgsType()
export class CreateRestaurantDto {
  @Field(type => String)
  name: string;
  @Field(type => Boolean)
  isVegan: boolean;
  @Field(type => String)
  address: string;
  @Field(type => String)
  ownersName: string;
}
```

## 5. Class validator 사용
### 1) 설치하기
```bash
npm i class-validator
// npm i class-transformer
```

### 2) 파이프라인 적용하기
- `main.ts`에 파이프라인을 적용해준다.
```typescript
  app.useGlobalPipes(new ValidationPipe());
```
