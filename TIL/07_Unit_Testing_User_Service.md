# Unit Testing User Service

## 1. 테스트 환경 설정하기
- 테스트 파일을 만들기 위해서 `spec`을 파일 이름에 필수적으로 포함시켜준다.

## 2. Mock
- 가짜 함수의 실행, 가짜 클래스의 실행
- 특정 서비스를 단독으로 테스트하고 싶을 때 사용

## 3. Test Coverage
```bash
npm run test:cov
```
- 위 명령어로 특정 파일만 보고싶다면 `package.json`을 변경한다.
```bash
"collectCoverageFrom": [
    "**/*.service.(t|j)s"
],
```