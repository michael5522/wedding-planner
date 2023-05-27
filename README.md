# A-List Wedding

A full stack JavaScript wedding planner made for creating and organizing lists. A-list allows users to keep track of all the details and view the timeline.


## Live Demo

See it live here: [A List Wedding](https://a-list-wedding.michaelkchang.com/)

## Built With
- Javascript
- HTML5
- CSS3
- Express
- React.js
- Node.js
- PostgreSQL

### Additional Tools
- Bootstrap 4
- Webpack
- Dokku
- AWS EC2
- Jsonwebtoken
- Babel

## Preview

Desktop
<p align="center">
<img src="/gifs/desktop-view.gif">
</p>

Mobile
<p align="center">
<img src="/gifs/mobile-view.gif" height="500">
</p>

## Development

### System Requirements

- Make sure Docker is installed and running
- Install the 'Dev Containers' extension published by Microsoft

### Getting Started


1. Open VSCode and click the Dev Container shortcut located on the bottom left of VSCode

2. Clone the 'repository in container volume' with the following command:

   ```shell
   git clone https://github.com/michael5522/final-project
   ```

3. Install all dependencies with NPM

    ```shell
    npm install
    ```

4. Duplicate the .env file from the provided .env.example below

      ```shell
        cp .env.example .env
      ```

5. Start the postgresql server and turn it online

      ```shell
        sudo service postgresql start
      ```

6. Create a database locally that matches the one inside the .env file
      ```shell
        createdb weddingDatabase
      ```

7. Fill out the database with the schema and tables by running command below
      ```shell
        npm run db:import
      ```

8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
