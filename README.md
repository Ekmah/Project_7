## Project setup to do IN EACH FOLDER
```
dependencies backend/frontend:
    -both: node v14.15.4 (globally installed: npm -g install node@14.15.4)
    -backend: MySQL VERSION(): 8.0.26, 
    -backend: nodemon v2.0.15 (globally installed: npm -g install nodemon@2.0.15)

execute inside folder the following command:
npm install

```
### REQUIRE MYSQL DB (host is localhost)
```
You will need the database name and user name and password for the .env later.
You will need to create a SQL Database with the host being the localhost. Then import the DB using the Dump folder created using the data export function of MySQL workbench  which is inside the mysqldbexport folder. It contains 3 .sql files, 1 for each table.
(tutorial for  MySQL workbench users; when the DB is created, go to Server -> Data Import -> select the Dump folder using the 'Import from the Dump Project Folder' option, then go to the 'Import Progress' tab of the Data Import and click on 'Start Import'.)
If you want a modo, you will need to create yourself a modo user by creating a user with the value for the 'type' field being 'modo'.
The project should work without, however.
NOTE: if you can't use those .sql files and need to setup the bdd by hand, you can open the .sql files with any text editor: all the SQL commands are inside.
```
### Follow env-example in backend folder for the .env creation. 
```
The .env should be created in the same folder as the env-example.
```
### Create images folder inside the backend folder
```
to give a place for uploaded images to resides
```
### Launch frontend in frontend folder
```
npm run serve
```

### Launch backend in backend folder
```
nodemon server
NOTE: if you have a problem with the connection to MySQL because you use the new authentication method, try to go inside the db_connection file in the backend folder and replace 'require('mysql');' by 'require('mysql2');', mysql2 support the new 'caching_sha2_password' method, and should have already been installed.
```
### The Porject should be operational now.
```
go to http://localhost:8080/#/ to see the project :D
```
