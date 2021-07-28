CREATE USER 'conmebol'@'localhost';
ALTER USER 'conmebol'@'localhost' IDENTIFIED BY 'conmebol'; 
ALTER USER 'conmebol'@'localhost' IDENTIFIED WITH mysql_native_password BY 'conmebol';
GRANT ALL PRIVILEGES ON *.* TO 'conmebol'@'localhost';
CREATE DATABASE ca2021;


