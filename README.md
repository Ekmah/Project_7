## Project setup to do IN EACH FOLDER
```
dependencies backend/frontend:
    -node v14.15.4 (globally installed: npm -g install node@14.15.4)
    -MySQL VERSION(): 8.0.26, 
    -nodemon v2.0.15 (globally installed: npm -g install nodemon@2.0.15)

execute inside folder the following command:
npm install

```
### REQUIRE MYSQL DB (host is localhost, user is root user)
```
You will need the database name and root password for the .env later.
You will need to create a SQL Database with the host being the localhost and the user being root. Then import the DB using the
Dump folder created using the data export function of MySQL workbench  which is inside the mysqldbexport folder. It contains 3 .sql files, 1 for each table.
(tutorial for  MySQL workbench users; when the DB is created, go to Server -> Data Import -> select the Dump folder using the 'Import from the Dump Project Folder' option, then go to the 'Import Progress' tab of the Data Import and click on 'Start Import'.)
If you want a modo, you will need to create yourself a modo user by creating a user with the value for the 'type' field being 'modo'.
The project should work without, however.

```
### Follow env-example in backend folder for the .env creation. 
```
The .env should be created in the same folder as the env-example.
```

### Launch frontend in frontend folder
```
npm run serve
```

### Launch backend in backend folder
```
nodemon server
```
### The Porject should be operational now.
```
go to http://localhost:8080/#/ to see the project :D
```
