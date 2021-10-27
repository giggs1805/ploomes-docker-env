#!/bin/bash

PROJECT_PATH=$(pwd)

docker network create cultured_network

docker run -d --network cultured_network --name=porygon -p 9000:27017 \
-v ${PROJECT_PATH}/mongo_team/mongo/init.d/:/docker-entrypoint-initdb.d/ \
-v ${PROJECT_PATH}/mongo_team/mongo/data/:/data/db/ \
--env-file ${PROJECT_PATH}/mongo_team/.env \
mongo

docker run -d --name=mewtwo -p 3060:3060 mewtwo

docker run -d --network cultured_network --name=vaporeon -p 8080:8080 \
--env-file ${PROJECT_PATH}/node_commdb/.env \
vaporeon

docker run -d --name=lickitung -p 3000:3000 \
--env-file ${PROJECT_PATH}/express_dex/.env \
lickitung
