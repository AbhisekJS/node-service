

db.system.users.find({ user: "dbtest", db: "nodemongotest" })


### exec root level

mongosh -u <username> -p <password> --authenticationDatabase admin
mongosh -u dbtest -p password --authenticationDatabase admin