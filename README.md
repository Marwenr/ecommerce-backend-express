# Ecommerce-backend-expressjs
## Introduction
This is the backend for our Ecommerce website. It provides RESTful APIs for managing products, users, and orders.
## Getting Started
Instruction for cloning, installing dependencies and running the server locally.
```
> git clone https://github.com/marwenr/ecommerce-backend-node-express.git <your-folder-name>
> cd <your-folder-name>
> npm install
> npm start
```
## Testing
Run tests using Jest:
```properties
npm test
```
## Configuration
Create a .env file in the project's root directory and add the following configuration variables
```
> PORT = ...
> MONGO_URL = ...
> ACCESS_TOKEN_PRIVATE_KEY = ...
```
## Project Structure
```
src\
 |--controllers\    # Controllers
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--services\       # Business logic
 |--utils\          # Utility functions
 |--tests\          # Tests
 |--index.js        # App entry point
```
fetch('http://localhost:"PORT"/api/auth/usres', {
             headers: {Authorization: 'Bearer ' + TokenOfadmin or TokenOfManager}
             })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get a single user :**
```
fetch('http://localhost:"PORT"/api/auth/usre/'+userId, {
             headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager}
             })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Create a new account :**
```
fetch('http://localhost:"PORT"/api/auth/register',{
            method:"POST",
            body:JSON.stringify(
                {
                    name: "John Saa",
                    email: "john.sa@example.com",
                    password: "123456",
                    address: {
                        city: "kilcoole",
                        street: "7835 new road",
                        number: 3,
                        zipcode: "12926-3874",
                    },
                    phone: "1-570-236-7033",
                 }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Login :**
```
fetch('http://localhost:"PORT"/api/auth/login',{
            method:"POST",
            body:JSON.stringify(
                {
                    email: "john.sa@example.com"
                    password:'123456'                   
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Update User :**
```
fetch('http://localhost:"PORT"/api/auth/user/update/'+userId,{
            method:"POST",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager or 
            TokenOfUser},
            body:JSON.stringify(
                {
                    name: "John Saa",
                    address: {
                        city: "kilcoole",
                        street: "7835 new road",
                        number: 3,
                        zipcode: "12926-3874",
                    },
                    phone: "1-570-236-7033",
                 }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Change User Password :**
```
fetch('http://localhost:"PORT"/api/auth/user/updatepw/'+userId,{
            method:"POST",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager or 
            TokenOfUser},
            body:JSON.stringify(
                {
                    oldPassword: "123456",
                    password: "123457"
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Delte User :**
```
fetch('http://localhost:"PORT"/api/auth/user/'+userId,{
            method:"DELETE",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager or 
            TokenOfUser},
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```