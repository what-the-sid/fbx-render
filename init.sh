#!/bin/bash
pip install -r requirements.txt

npm i -g pnpm

export NODE_ENV=development
export APP_PORT=4000
export DB_NAME=data.test.sqlite
export DB_DIALECT=sqlite
echo "exported ENV Variables ✅"

pnpm i
pnpm add sequelize-cli -w
pnpm add sqlite3 -w
echo "installed dependencies ✅"

echo "Migrated tables ✅"
cd fbx-editor-backend && npx sequelize-cli db:migrate
cd ..
