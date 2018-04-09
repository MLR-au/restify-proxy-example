#!/usr/bin/env bash

docker-compose -f compose.yml stop
docker-compose -f compose.yml rm -f
