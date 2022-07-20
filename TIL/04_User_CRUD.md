# User

## 1. User Entity
- 모듈 추가하기
    - `common` 모듈에는 app에서 공유하는 모든 것들을 포함한다.
    - `user` 모듈은 `common`모듈을 상속한다.
```bash
nest g mo users
nest g mo common
```
- `common` 모듈
    - id : `@PrimaryGeneratedColumn()` 사용
    - createdAt : `@CreateDateColumn()` 사용
    - updatedAt : `@UpdateDateColumn()` 사용
- `user` 모듈
    - email
    - password
    - role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

