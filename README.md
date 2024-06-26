
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="./public/img/logo.png">
    <h3 align="center">connecti-nodejs</h3>
    <p align="center">
        A web application for managing and joining meetings and/or groups
        <br />
        <br />
    </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div align="center">
    <img src="./public/img/app.gif"/>
</div>


This is a monolitic web application made on an Udemy course of Node.js. 

Said Udemy course is in Spanish, but I coded the project in English so it can be reviewed out more internationally.

The project has the following features:

* Sign in and sign up
    * Upload or change a profile image
    * Edit profile name, description or email
    * User verification by email
    * View groups information
    * View other users profile
    * View Connecti's
        * Geolocation on a map, showing nearest Connecti's around the Connecti's you are viewing
        * Comments system
    * Upload and manage groups and Connecti's (Meetings)
        * Join existing groups and Connecti's
        * See a list of interested people
        * Modify groups and Connecti's
        * Delete groups and Connecti's
* Connecti's search system

And much more!


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![Node][NodeJS-logo]
* ![JavaScript][JavaScript-logo]
* ![Nodemon][Nodemon-logo]
* ![Express.js][Express.js-logo]
* ![Passport][Passport-logo]
* ![EJS][EJS-logo]
* ![PostgreSQL][PostgreSQL-logo]
* ![Sequelize][Sequelize-logo]
* ![Env][Env-logo]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* SMTP Server (to handle email confirmation and lost password systems)
* PostgreSQL database
  * PostGIS installed
* Node.js
* Git (for cloning the project)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/EmRodDev/connecti-nodejs
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename the `.env.example` file on the project's root folder to `.env`:

   The environment variables on said file corresponds to the following descriptions:
   - PORT: The port of the application
   - DB_NAME: The name of the PostrgreSQL database
   - DB_USER: The username of the PostgreSQL database
   - DB_PASS: The user's password of the PostgreSQL database
   - DB_PORT: The port of the PostgreSQL database
   - SECRET: The secret key to sign the session cookie
   - KEY: Another secret key used in Express requests
   - EMAIL_USER: The username of the STMP server account
   - EMAIL_PASS: The password of the STMP server account
   - EMAIL_HOST: The hostname of the STMP server account
   - EMAIL_PORT: The port of the STMP server account


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

For development, this project only needs to run one command on the command line client in order to use it properly:

  ```sh
  npm run development
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

[![Linkedin][LinkedIn-logo]][linkedin-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- LOGOS -->
[LinkedIn-logo]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Nodemon-logo]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[Express.js-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Passport-logo]: https://img.shields.io/badge/Passport-34E27A?logo=passport&logoColor=000&style=for-the-badge
[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[EJS-logo]: https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=fff&style=for-the-badge
[PostgreSQL-logo]: https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge
[Sequelize-logo]: https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=fff&style=for-the-badge
[Env-logo]: https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge


<!-- URLS -->
[linkedin-url]: https://www.linkedin.com/in/erodriguezarr/
[product-screenshot]: screenshot/screenshot.gif
