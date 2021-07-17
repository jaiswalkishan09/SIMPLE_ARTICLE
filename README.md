# SIMPLE_ARTICLE
Made using react and django and mysql 
It's article post delete website which changes it's behaviour according to user rols
i.e if a user is super user than he has permission to do CRUD operation both on articls and users that was registered
-Normal registered user has only read permission of Article
-super user has permisson to both read update and delete article and users from the mainpage

It uses token authentication from DRF.
It uses React hooks 



In admin pannel of user you can grant acces revoke access from the users

To_Run:
first crete a superuer: python3 manage.py createsuperuser
and the usename must be an email type

and then login with the superuser
if you register direct by cutom login page than you have only read permission.