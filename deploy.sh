#!/bin/bash

cd "$(dirname "$0")"

# if the server's encryption key doesn't exist, we create a new one.
if [ ! -f "backend/server.key" ]; then
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 31 | head -n 1 > backend/server.key
fi

# if the server's database doesn't exist, we copy the base one
if [ ! -f "backend/db/database.db" ]; then
    cp backend/db/database.db.base backend/db/database.db
fi
