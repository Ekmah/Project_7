## Project setup to do IN EACH FOLDER
```
npm install
```
### REQUIRE MYSQL DB (host is localhost, user is root user)
```
You will need the database name and root password for the .env later.
Dump folder created using data export of MySQL workbench inside the mysqldbexport folder. Contains 3 .sql files, 1 for each table.
If you want a modo, you will need to create yourself a modo user by creating a user with the value for the 'type' field being 'modo'.
The project should work without, however.

```
### Follow env-example in backend folder for the .env creation.

### Launch frontend in frontend folder
```
npm run serve
```

### Launch backend in backend folder
```
nodemon server
```

