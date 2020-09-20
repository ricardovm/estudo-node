#!/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`

docker run --rm --name mysql-alura -v $SCRIPTPATH/var/lib/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=agenda-petshop -p 3306:3306 -d mysql:8.0 mysqld --default-authentication-plugin=mysql_native_password
