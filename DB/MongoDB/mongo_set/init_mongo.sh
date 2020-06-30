#!/usr/bin/env bash
echo "Creating mongo users..."
mongo << EOF
use coupons
db.createUser({user: 'scrapy', pwd: 'scrapy', roles:['readWrite', 'dbAdmin']})
EOF
echo "Mongo users created."
