CREATE USER 'commebol'@'localhost';
ALTER USER 'commebol'@'localhost' IDENTIFIED BY 'conmebol'; 
ALTER USER 'commebol'@'localhost' IDENTIFIED WITH mysql_native_password BY 'conmebol';
GRANT ALL PRIVILEGES ON *.* TO 'commebol'@'localhost';
CREATE DATABASE ca2021

