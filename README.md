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
```
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
## Api Links
### Users
**Get all users :**
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
            method:"PUT",
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
            method:"PUT",
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
**Delete User :**
```
fetch('http://localhost:"PORT"/api/auth/user/'+userId,{
            method:"DELETE",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager or
            TokenOfUser},
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
### Products
**Get all categories :**
```
fetch('http://localhost:"PORT"/api/shop/categories')
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get all products :**
```
fetch('http://localhost:"PORT"/api/shop/products')
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get a single product :**
```
fetch('http://localhost:"PORT"/api/shop/product/'+productId)
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get products in a specific category :**
```
fetch('http://localhost:"PORT"/api/shop/category/'+categoryId)
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Add new Category :**
```
fetch('http://localhost:"PORT"/api/shop/category/create,{
            method:"POST",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
            body:JSON.stringify(
                {
                    title: "desktop"
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Add new product :**
```
fetch('http://localhost:"PORT"/api/shop/product/create',{
            method:"POST",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
            body:JSON.stringify(
                {
                    title: 'hp 15',
                    price: 1333.5,
                    description: 'lorem ipsum set',
                    image: 'test',
                    category: 'desktop'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Update product :**
```
fetch('http://localhost:"PORT"/api/shop/product/'+productId,{
            method:"PUT",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
            body:JSON.stringify(
                {
                    title: 'hp 15',
                    price: 1333.5,
                    description: 'lorem ipsum set',
                    image: 'test',
                    category: 'desktop'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Delete category :**
```
fetch('http://localhost:"PORT"/api/shop/category/'+categoryId,{
            method:"DELETE",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Delete product :**
```
fetch('http://localhost:"PORT"/api/shop/product/'+ProductId,{
            method:"DELETE",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
### Cart
**Get carts :**
```
fetch('http://localhost:"PORT"/api/cart/all', {
            headers: {Authorization: 'Bearer ' + TokenOfadmin or TokenOfManager}
            })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get cart by id :**
```
fetch('http://localhost:"PORT"/api/cart/'+cartId, {
             headers: {Authorization: 'Bearer ' + TokenOfadmin or TokenOfManager}
             })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Get cart by date :**
```
fetch(`http://localhost:"PORT"/api/cart/?year=${year}&month=${month}&day=${day}`, {
            headers: {Authorization: 'Bearer ' + TokenOfadmin or TokenOfManager}
            })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Delete cart :**
```
fetch(`http://localhost:"PORT"/api/cart/`+cartId, {
            method:"DELETE",
            headers: {Authorization: 'Bearer ' + TokenOfadmin or TokenOfManager}
            })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Add new cart :**
```
fetch('http://localhost:"PORT"/api/cart/create',{
            method:"POST",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
            body:JSON.stringify(
                {
                    userId: '6534248bb42b5e6bf40e0564',
                    products: [
                        {productId: "12", quantity:5}
                    ]
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```
**Update cart :**
```
fetch('http://localhost:"PORT"/api/cart/'+cartId,{
            method:"PUT",
            headers: {Authorization: 'Bearer ' + TokenOfAdmin or TokenOfManager},
            body:JSON.stringify(
                {
                    userId: '6534248bb42b5e6bf40e0564',
                    products: [
                        {productId: "12", quantity:8},
                        {productId: "548", quantity:4},
                    ]
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
```