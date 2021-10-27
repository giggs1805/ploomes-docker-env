#!/bin/bash

CONTAINERS=('porygon' 'vaporeon' 'mewtwo' 'lickitung')
[[ -n $(docker ps -q) ]] && docker stop ${CONTAINERS[@]}
[[ -n $(docker ps -aq) ]] && docker rm ${CONTAINERS[@]}
docker network prune -f