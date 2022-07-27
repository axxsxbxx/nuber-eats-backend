# User Authentication

## 1. Generating JWT
> `JSON Web Token`의 목적은 비밀 유지가 아니다.
> - 우리만이 유효한 인증을 할 수 있게 하는 것이 목적이다.
> - 내부에 담겨진 정보 자체가 아니라, 정보의 진위 여부가 중요하다는 것이다.
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) 설치하기
```bash
npm i jsonwebtoken
npm i @types/jsonwebtoken --only-dev
```
- 사용자들 역시 token 내부에 담긴 정보를 알 수 있다.
    - token에 담긴 정보는 알아내기 어려운 것이 아니다. 따라서 token에 너무 많은 정보를 넣어서는 안 된다.
- `.env` 파일에 SECRET_KEY를 추가해준다.
    - [Random Key Generator 참고 사이트](https://randomkeygen.com/)
- `app.module.ts > ConfigModule`에 SECRET_KEY를 추가해준다.
    `SECRET_KEY: Joi.string().required()`
- `user.module.ts`에 `ConfigService`를 import 해준다.
- `dependency inject` 덕분에 간단하게 구현 가능한 것이다.
    - 원하는 class를 적어주면 nestjs가 그 정보를 자동으로 가져다 주는 것을 의미

## 2. Create Own JWT Modules
- 모듈의 종류
    - `static module` : 어떤 설정도 되어있지 않은 정적인 모듈
    - `dynamic module` : `.forRoot`와 같이 설정이 적용되어 있는 모듈
    - 동적 모듈은 결과적으로 정적 모듈이 된다. 동적 모듈은 중간 과정이라고 볼 수 있다.
- 모듈 생성하기
```bash
nest g mo jwt
```

## 3. [MiddleWare](https://docs.nestjs.com/middleware#middleware)
- `main.ts`의 `app.use()`에는 functional middleware만 사용 가능하다.
    - class middleware는 `app.module`에서 사용해야 한다.
- http기술은 `header`을 사용하기 위해서 middleware을 사용한다.
    - header를 가져와서 만든 `jwtService.verify()`를 사용한다.
- request object를 제어할 수 있다.

## 5. AuthGuard and Deorator
- guard는 function의 기능을 보충해준다.
    - `canActivate` 함수는 true 또는 false를 반환해야 한다.
        - true를 return하면 request를 진행시키고, false를 return하면 request를 중지시킨다.
- decorator는 value를 return한다.
