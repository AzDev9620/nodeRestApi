# nodeRestApi
nodeRestApi

Bismillahi Rohmani Rohim 



# Users

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { name: 'foo', email:'test@test.com', password: '12345', passwordConfirmation: '12345', majburiy emas - {role: (default) "subscripte",  status: (default:boolean) true,  status_toggle: (default:number) 1, is_ban: (default:number) 1,  bio: "webDeveloper", adress: "Sergeli-2", city: "Tashkent", street: "Amir Timu 23 ko'cha"} | Create a new user. |

| /login | `POST` | { email: 'foo', password:'1234' } | Generate a token. |






<pre>
.env: {
     DB_URL=mongodb+srv://nodetest:HvPI0EFj97mkMZkz@cluster0.jmosj.mongodb.net/test 
     PORT=5000 
     JWT_ACCESS_SECRET=SecreKey2213 
     JWT_REFRESH_SECRET=SercretRefres25665 
     SMTP_HOST=smtp.gmail.com 
     SMTP_PORT=587 
     SMTP_USER=theo.projects123@gmail.com 
     SMTP_PASSWORD=nfkvkfceucescqzd 
     API_URL=http://localhost:5000 
     CLIENT_URL=http://localhost:3000 
}</pre>