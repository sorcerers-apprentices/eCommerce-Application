# eCommerce-Application

This platform replicates real-world shopping experiences in a digital environment, allowing users to browse products, add them to a cart, and complete purchases. It includes features like user authentication, product management, and order processing.

## Technology stack used

The project uses the following technologies:

#### Сore stack:

- React `v19.x`
- TypeScript
- SCSS

#### Stack for testing:

- Vitest
- React Testing Library

## Setup and Running

Use `node 21.x` or higher.

### Server

The [commercetools](https://commercetools.com/) platform acts as a server for the application. [Here](https://docs.commercetools.com/docs) you can find documentation for further steps.

- You need to register a commercial account on the [commercetools](https://commercetools.com/) platform.
- You must create a commercial project to access the platform API. At this stage we recommend using the [official documentation](https://docs.commercetools.com/docs).
- Set up authorization, currencies, languages and other configurations in [Merchant Center](https://docs.commercetools.com/merchant-center).
- After configuring the project configuration, you have received data for accessing the platform API, which you can specify in the `.env` file of the [client application](#client).

### Client

- Clone this repo: `$ git clone https://github.com/sorcerers-apprentices/eCommerce-Application.git` (you need branch `develop`)
- Install dependencies: `$ npm install`
- Replace in the `.env.example` file the data for API access obtained when setting up the configuration in [Merchant Center](https://docs.commercetools.com/merchant-center).
- Remove the `.example` prefix for the `.env` file in the root project directory.
- Start server: `$ npm run start`
- Now you can open the client side to the address: `http://localhost:5173/` (if this port will be used by another application, the builder will automatically select another port and show it in the console)

## Available scripts

- `$ npm run start` - Starts development server.

- `$ npm run build` - Builds the production version of the project into the `dist/` folder.
- `$ npm run preview` - Preview of the built application. Please use after `$ npm run build`

- `$ npm run prepare` - Initializes Husky and installs Git Hooks.

- `$ npm run format` - Automatically formats all code with Prettier.
- `$ npm run format:check` - Checks if the code matches the formatting style (no changes).

- `$ npm run lint:ts` - Checks TypeScript code for errors (ESLint).
- `$ npm run lint:ts:fix` - Fixes auto-correctable ESLint errors.
- `$ npm run lint:scss` - Checks SCSS files for errors (Stylelint).
- `$ npm run lint:scss:fix` - Corrects automatically correctable errors in styles.

- `$ npm run test:unit` - Runs unit tests (Vitest).
