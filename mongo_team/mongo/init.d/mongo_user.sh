set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE
db.createUser(
    {
        user: "${DB_MONGO_USER}",
        pwd: "${DB_MONGO_PWD}",
        roles: [
            {
                role: "readWrite",
                db: "${MONGO_INITDB_DATABASE}"
            }
        ]
    }
); 
EOF
