#!/bin/sh

# Create Default RabbitMQ setup
( sleep 10 ; \

username='chester'
password='abcd1234'
vhostname='airflow-rabbitmq'

# Create users
rabbitmqctl add_user $username $password

# Set user rights
rabbitmqctl set_user_tags $username administrator

# Create vhosts
rabbitmqctl add_vhost $vhostname

# Set vhost permissions
rabbitmqctl set_permissions -p $vhostname $username ".*" ".*" ".*"
) &    
rabbitmq-server $@

rabbitmq-plugins enable rabbitmq_management