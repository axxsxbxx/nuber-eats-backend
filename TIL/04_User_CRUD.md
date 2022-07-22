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


## 2. Hashing Passwords
> `hash` : 단방향 함수(one-way function)
### [Listener and Subscribers](https://typeorm.io/listeners-and-subscribers)
- Listener : 기본적으로 entity에 무슨 일이 생길 때 실행되는 것
### [bcypt 사용](https://www.npmjs.com/package/bcrypt)
- hash하고 hash 확인하는 것에 사용
```bash
npm i bcrypt
npm i @types/bcrypt --dev-only 
```



## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

