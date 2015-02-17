#!/bin/bash

fil=/var/log/system.log

#test for existence of the log file
if [ -f $fil ]
then

  while read line
  do

curl -X POST -H "Content-Type: application/json" \
    --data '{ "type":"default", "message":"'"$line"'", "name":"system.log" }' \
    http://127.0.0.1:8080/message

  done < $fil

fi
