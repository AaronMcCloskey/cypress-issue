# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Setup

### Yarn

Firstly you will need to have `yarn` globally installed via `npm`
If you have not got `yarn` installed, run `npm i -g yarn` in a terminal

Once successful, run `yarn -v` in your terminal and you should see a print of the version you have installed

### Environment Variables

There are a few environment variables that will need to be set in a `.env` file

First, you will need to create the .env file

Open a terminal in the root of this project and run the following command which will copy the contents of the `.env.example` file into a `.env` file

```
cp -f .env.example .env
```

- `DATABASE_URL`: Should already have a value of `file:./db.sqlite`
- `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` on Linux and paste value, or type a random string
- `NEXTAUTH_URL`: Should be default be `http://localhost:3000`
  - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
    - If you already have a Google OAuth Project, then great you can use the client id & client secret on the `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` respectively, otherwise follow the steps below
    - Navigate to [Google Cloud Platform](https://console.cloud.google.com/projectcreate) and signin
      - Set the Project Name
      - Navigate to the [APIs Overview](https://console.cloud.google.com/apis/dashboard)
      - Click on the [Credentials](https://console.cloud.google.com/apis/credentials) Option
      - Click on Create Credentials and Select [OAuth Client ID](https://console.cloud.google.com/apis/credentials/oauthclient)
      - Click on "Configure Consent Screen"
        - Select external user type
        - Add the App Name, User Support Email & Develop Context Email Address
        - Save and Continue
        - Can skip scopes screen by clicking Save and Continue
        - Navigate back to Creating an [OAuth Client ID](https://console.cloud.google.com/apis/credentials/oauthclient)
      - Select `Web Application` as Application Type
      - Give credential name
      - Add Authorized redirect URIs
        - `http://localhost:3000/api/auth/callback/google`
      - Click Create
      - You should now be presented with the Client ID and the Client Secret
        - If not, you can go to the web application and retrieve from there
      - In the `.env` file add the client id to `GOOGLE_CLIENT_ID` and client secret to `GOOGLE_CLIENT_SECRET`
- `GOOGLE_LOGIN_EMAIL`: Password of Google Account (I think it will need to be an account without any 2FA) used to login via Google SSO in Cypress
- `GOOGLE_LOGIN_PASSWORD`: Password of Google Account used to login via Google SSO in Cypress

### Installing Dependencies

You will need to install all dependencies before running the application.

You can do this simply by running the following command in your terminal on the root of the project

```
yarn
```

This should also generate the SQLite database with the migration data.

So there should be a file called `db.splite` in `prisma/db.sqlite`

If there is not, you may need to run the following commands in your terminal on the root of the project

```
yarn migrate:prod && npx prisma generate
```

## Running Application

You'll need to run the application while running Cypress.

To do this, open a terminal on the root of the project and run the following command

```
yarn dev
```

This should compile a client and server on `http://localhost:3000` and should be presented with the website.

## Running Cypress Integration

To run the Cypress Integration test, open another terminal window on the root of the project and run the following command

```
yarn cypress
```

You should then be promoted to select `E2E Testing`, click this option
Then select `Chrome` as the browser to run the E2E Test
This should open a chrome window where you can select the `login.cy.test` test
This should then run the test.

If you open up the developer console. You will see logs that are checking for `Cypress` on the `window` object in both the application itself (logged as `Is Cypress Init Application`) and on the test (logged as `Is Cypress Init Cypress`)

You will observe that initally when the test spins up and opens the `/` page, `window.Cypress` exists, but once being redirected from `accounts.google.com` within the `cy.origin` `window.Cypress` has now become undefined.

You will then see that once `cy.reload` is ran `window.Cypress` exists once again.
