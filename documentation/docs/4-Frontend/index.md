# Front-end (React)

For the application's front-end, the team uses React. Please follow the COOL System Setup Guide to get up and running.

Once running, you will need the database + backend in tandem to be able to access persistent data storage + authentication through jwt httponly cookies.

## Deployment

Execute the following to build pages:
```bash
npm run build
```
This will output html/css/js files. These then can be hosted on your favorite webserver. For this project we hosted a demo at github pages: https://cityoforlando-2025.github.io/COOL/

## Maintaining

To continue development, the component page structure is followed. Edit /components, to then build into /pages.

There is an overarching wrapper component which handles authentication. This will call our backend for a JWT to be stored in httponly. Utilizing httponly cookies will ensure better security against XSS (Cross Site Scripting) attacks.