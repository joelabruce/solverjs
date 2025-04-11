# solverjs
A project aimed at solving real business problems with minimal code and infrastructure.

## WIP (Work In Progress)
What began as following a tutorial has evolved into a set of services to help businesses grow.
The first feature is a deployable docker continer that can keep track of purchase keys and machine ids for login and registration. **It is not fully secure yet, as the purchase endpoint is not finished and can currently be used to give free access to services.**

## Installation

1. Install Docker and Docker Compose on target machine.
2. Clone this repository.
### Windows
On Windows machines, navigate to `\\wsl$`. Then select the distro, then `home/{username}`. Inside this folder it is highly recommended to create a placeholder folder, such as `gitrepos` to clone into. Do not clone the repo directly into the node folder, as Docker copies the necessary files there.

3. Create `.env` file in project folder for your custom secrets with the following settings. **PLEASE DO NO USE THESE DEFAULTS in production. Also, change the init.sql file to ensure db names match.**
```
CHOKIDAR_USEPOLLING=true

MYSQL_ROOT_PASSWORD=your_custom_secure_root_password
MYSQL_DATABASE=your_custom_db_name
MYSQL_USER=your_custom_user
MYSQL_PASSWORD=your_custom_secure_password
```
4. Run the following command in your terminal
```
docker-compose up --build
```
5. Make sure to run this command if you need to change the database sprocs or other custom code. Use the `-v` flag to drop the database and recreate. **Use this flag with caution, should backup database first.**
```
docker-compose down
```
