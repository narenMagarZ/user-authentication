# User Authentication API

This repository contains a User Authentication API built using Express and TypeScript. The API allows users to register, log in, update their information, and delete their accounts.

## Features

- User registration with unique username and email validation.
- Secure password storage using bcryptjs.
- User login with password authentication.
- Update user information (username, email, password).
- Delete user account.

## Prerequisites

To run this API locally, you need to have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:
```
git clone https://github.com/narenMagarZ/user-authentication.git
cd user-authentication
```
2. Install the dependenies
3. Set up environment variables:

4. Run the API:
```
npm run dev
```


## API Endpoints

The API exposes the following endpoints:

- `POST /api/register`: Register a new user with a unique username and email.
- `POST /api/login`: Authenticate user login.
- `PUT /api/user/:id`: Update user information (username and email).
- `DELETE /api/user/:id`: Delete the user account.
- `put /api/changepassword/:id`: Change the user password.

## Testing

To run the tests, use the following command:
```
npx jest
```
