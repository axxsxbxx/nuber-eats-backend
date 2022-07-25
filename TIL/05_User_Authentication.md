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
    - token에 담긴 정보는 알아내기 어려운 것이 아니다.
- `.env` 파일에 SECRET_KEY를 추가해준다.
    - [Random Key Generator 참고 사이트](https://randomkeygen.com/)
- `app.module.ts > ConfigModule`에 SECRET_KEY를 추가해준다.
    `SECRET_KEY: Joi.string().required()`
- `user.module.ts`에 `ConfigService`를 import 해준다.

## 2. Create Own JWT Modules
```bash
nest g mo jwt
```