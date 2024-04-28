# 9Kicks Shop

This the Frontend of Online Shopping for the 9Kicks project. It is written in `Svelte` and `TypeScript` and uses the `SvelteKit` framework.

Implemented features:

- [x] Get all users infomation and list all users
- [x] Get order history for each users
- [x] Create user
- [x] Update user data
- [x] Delete user
- [x] Get all products infomation and list all products
- [x] Publish product
- [x] Update product data 
- [x] Update stock
- [x] Deleted product


## Prerequisites

- AWS account
- AWS DynamoDB
- Running Microservices Go (Backend) and Microservices Kotlin (Backend) locally or remotely
- node.js

## Getting Started

```bash
cp .env.example .env
```

Input your credentials in the `.env` file.

```bash
STRIPE_SECRET_KEY=<YOUR-STRIPE-SECRET-KEY>
PUBLIC_STRIPE_KEY=<YOUR-PUBLIC-STRIPE-KEY>
PUBLIC_KOTLIN_BACKEND_URL=<BACKEND-KOTLIN-URL-HOST>
PUBLIC_GO_BACKEND_URL=<BACKEND-GO-URL-HOST>
```

Run development server :

```bash
git clone git@github.com:9KicksXCUmart/9Kicks-Admin-Panel.git
cd 9Kicks-Admin-Panel

npm i pnpm
make setup

# Start the development server
make run
```
