
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
    <img src="./public/img/map.png"/>
</div>


This is a monolitic web application made on an Udemy course of Node.js. 

Said Udemy course is in Spanish, but i coded the project in English so it can be checked out more internationally.

The project has the following features:

* Sign in and sign up
    * Upload a profile image
    * Edit profile name, email, image and password
    * Recover your password
    * User verification by email
    * Upload and manage groups and Connecti's (Meetings)
        * Join existing groups and Connecti's
        * See a list of interested people
        * Modify groups and Connecti's
        * Delete groups and Connecti's
* Search groups and Connecti's through the navbar finder


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
3. Create an `.env` file on the project's root folder with the following environment variables:
   ```env
    PORT=

    DB_USER=
    DB_PASS=
    DB_PORT=

    SECRET=
    KEY=

    EMAIL_USER=
    EMAIL_PASS=
    EMAIL_HOST=
    EMAIL_PORT=
   ```
   These environment variables corresponds to the following descriptions:
   - PORT: The port of the application
   - DB_USER: The username of the PostgreSQL database
   - DB_PASS: The user's password of the PostgreSQL database
   - DB_USER: The port of the PostgreSQL database
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
  npm start
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
