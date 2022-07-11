# 시작하기

## 1. NestJS 설치하기
```bash
npm i -g @nestjs/cli@^8.2.8
```

## 2. NestJS 프로젝트 생성하기
```bash
nest g application <프로젝트 이름>
cd <프로젝트 폴더>
npm i
```

## 3. NestJS 실행하기
```bash
npm run start:dev
```
- `http://localhost:3000/` 접속 후, 초기화면 확인

## 4. 기본 구조
- `app.module`은 `main.ts`로 import되는 유일한 모듈
- `main.ts`는 application을 실행하기 위한 것
    - 아래처럼 NestFactory가 AppModule로부터 application을 생성
    - 따라서 모든 것은 AppModule로 import될 것
```typescript
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
    }
```
