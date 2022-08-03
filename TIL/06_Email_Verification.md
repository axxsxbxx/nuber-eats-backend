# Email Verification

## 1. 일대일 관계
- User로부터 Verification에 접근하고 싶다면 JoinColumn을 User 쪽에 작성해야 한다.
- `JoinColumn()`은 필수로 작성해야 한다.
```typescript
@OneToOne(type => User)
@JoinColumn()
user: User;
```

## 2. pwd 재암호화 방지
- pwd를 선택하지 않는 방법
```typescript
@Column({ select: false })
@Field(type => String)
password: string;
```
- pwd가 있는 경우만 hash하는 방법
```typescript
async hashPassword(): Promise<void> {
    if (this.password) {
        try {
        this.password = await bcrypt.hash(this.password, 10);
        } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
        }
    }
}
```

## 3. [MailGun](https://www.mailgun.com/) 이용하기
- [Receive-SMSS](https://receive-smss.com/)를 활용해서 fake 번호를 생성할 수도 있다.

## 4. `GOT` 설치하기
- `request`와 동일한 역할을 한다.
```typescript
npm i got@11.8.3
```

## 5. `Form Data NPM` 설치하기
- node.js에서 스트림을 만드는 라이브러리
```typescript
npm i form-data
```