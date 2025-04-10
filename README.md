# Easygen Frontend

This is the frontend of the a web application, built with **React**, **TypeScript**, **Vite** and **Radix UI**. It handles user authentication and displays a protected dashboard.

## 🔧 Tech Stack

- React + TypeScript
- Vite
- shadcn/ui (Tailwind + Radix UI)
- Axios (For API calls)
- React Hook Form + Zod (for forms)
- Cypress (for E2E testing)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/zohajamil/easygen-FE.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add .env
Create a .env file at the root of project & add two vars in it as follows:
```bash
VITE_API_URL="http://localhost:3000/"
VITE_FRONTEND_URL="http://localhost:5173/"
```

### 4. Run the app
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173)

## 🧪 Testing the app
Cypress e2e tests are added for testing of the app. It tests the signup of user, login of the same user and then deletes the user from the database at the end for cleanup ensuring that the next time signup test is not failed. The following commands can be run for testing.

### 1. Run tests in command line
```bash
npm run cy:test:e2e
```

### 2. Run tests on UI
- Run this command
  ```bash
  npx cypress open
  ```
- Then select e2e testing & choose any browser of your choice to run tests on.
- Choose auth.cy.ts to run signup & login tests.

## 📁 Folder Structure
src/
├── components/
    ├── common/
    ├── ui/
├── lib/
    ├── interfaces/
    ├── utils/
    ├── hooks/
        ├── axios/
        ├── validation/
├── pages/

## ✅ Features
- Signup / Signin with encrypted token session
- Logout with dropdown menu
- Session persisted with MongoDB
- Protected App Page with Welcome message