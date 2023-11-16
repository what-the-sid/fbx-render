#!/bin/bash

npm i -g pnpm
pnpm i

export NODE_ENV=development
export APP_PORT=4000
export DB_NAME=data.test.sqlite
export DB_DIALECT=sqlite
echo "exported ENV Variables ✅"

npm i
npm i sequelize-cli
npm i webpack-cli
npm i sqlite3
echo "installed dependencies ✅"

echo "Migrated tables ✅"
cd fbx-editor-backend && npx sequelize-cli db:migrate
cd ..
