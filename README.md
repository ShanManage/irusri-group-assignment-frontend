# IG-ASSIGNMENT-FRONTEND
This repository contains the source code relates to IG take home assignment (Front-End). 

This is a [React.js](https://react.dev/) project bootstrapped with [`create vite`](https://vitejs.dev/guide/).

## Application structure
Source of the application is structured according to the following structure.

- `src` - Root directory which contains project source
    - `assets` - Static assets like images
    - `components` - components of the application
      - `atom` - atomic level reusable components
      - `composite` - reusable composite level components
    - `constant` - constants of the application
    - `context` - Contexts for state management
    - `hooks` - Custom hooks
    - `interface` - interfaces of the application
    - `pages` - pages of the application which combines components
    - `routes` - Application routing configurations
    - `styles` - global/reusable styles of the application
- `.eslintrc.json` - ES Lint configurations
- `.gitignore` - Specifies which files and directories should be ignored by Git
- `package.json` - NPM packages and configuration file.

## Setting up the development environment.

#### Recommended IDE
Visual Studio Code is recommended for local development.

#### Install dependencies

> [!IMPORTANT]
> node version 18.x.x has been used and tested in the dev environment. Not encourage to use any lower version.


Execute below NPM script in the root directory to install required dependencies.

```bash
npm install
```

#### Environment configuration
Read **.env.example** to find all the required env configurations. Strongly recommended to update the .env.example file if there is any change added to env configurations.

## Starting the development server

> [!IMPORTANT]
> Prerequisite for the development environment should be configured properly before apply any changes to the application source code. (Refer the **"Setting up the development environment"** section. )

Run the development server with:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the source code. The page auto-updates as you edit the file.