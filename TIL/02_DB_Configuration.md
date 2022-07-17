# DataBase Configuration

## 1. TypeORM
> 타입스크립트나 NestJS에서 DB 통신을 위해 ORM을 사용할 필요가 있다.
- `ORM` : 객체 관계 매핑(Object Relational Mapping)

### 1) 설정하기
- 설치하기
```bash
npm i --save @nestjs/typeorm typeorm pg
```
- app에 적용하기
    - `app.module.ts`에 추가하기
```typescript   
TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'subin',
    // localhost로 연결하면 postgres는 pwd 물어보지 않음 -- 틀리게 적어도 상관없음
    password: '12345',
    database: 'nuber-eats',
    synchronize: true,
    logging: true,
})
```

## 2. PostgreSQL
- [PostgreSQL 다운로드 및 설치](https://www.postgresql.org/download/)
- GUI : pgAdmin 사용

### 1) pgAdmin에서 fe_sendauth no password supplied window 에러 해결 방법
- [Windows 시스템 환경변수 설정](https://wookkk.tistory.com/entry/postgreSQL-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95-win10)
- 시작 메뉴에서 `서비스` 접근 후, `postgresql x-64-14` 중지
- `pg_hba.conf` 파일
    - 경로 :`C:\Program Files\PostgreSQL\14\data`
```yml
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
```
- 시작 메뉴에서 `서비스` 접근 후, `postgresql x-64-14` 실행
- pgAdmin으로 DB 생성

### 2) pgAdmin에서 컴퓨터 이름이 뜨지 않는 경우 해결 방법
```yml
# SQL Shell 실행
psql -U postgres

# 유저 목록 보기
postgres=# \du

# 유저 생성
postgres=# create user [userId];
# 유저 생성 성공하면 나타나는 문구 (없으면 생성 실패)
# CREATE ROLE 

# 유저에게 모든 권한 부여
postgres=# alter role [userId] superuser createrole createdb replication bypassrls;
# 권한 부여 성공하면 나타나는 문구 (없으면 실패)
# ALTER ROLE
```

## 3. NestJS Configuration Module
- `dotenv`의 최상위에서 실행된다.

### 1) 설정하기
- 설치하기
```bash
npm i --save @nestjs/config
```
- 가상환경 설정하기
```bash
npm i cross-env
```
- `package.json` 변경하기
```json
"start": "cross-env NODE_ENV=prod nest start",
"start:dev": "cross-env NODE_ENV=dev nest start --watch",
```
- app에 적용하기
```typescript
ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.',
    ignoreEnvFile: process.env.NODE_ENV === 'prod',
}),
```
- `.env` 파일 생성하기
```text
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=subin
DB_PASSWORD=12345
DB_NAME=nuber-eats
```

## 4. Joi 활용하기

### 1) 설정하기
- 설치하기
```bash
npm i joi
```
- app에 적용하기
```typescript
ConfigModule.forRoot({
    validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod').required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    }),
}),
TypeOrmModule.forRoot({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}),
```