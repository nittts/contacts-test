#!/bin/bash

echo ">>>> Setup DB Migration before container starts <<<<"

pnpm run migrate

echo ">>>> DB migrations work done <<<<"

echo ">>>> Building up application <<<<"

pnpm run build

echo ">>>> Building up done <<<<"


echo ">>>> Starting Application <<<<"

pnpm run start

