db = db.getSiblingDB('fleetops_trips');
db.createCollection('trips');

db = db.getSiblingDB('fleetops_notifications');
db.createCollection('notifications');