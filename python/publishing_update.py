from mongo_connect import *

db = get_database()
def update_publisher_address():
    springer_filter = {"name": "Springer"}
    new_address = {"city": "Düsseldorf", "street": "Kaiserstraße"}

    db.publishers.update_one(springer_filter, {"$set": {"address": new_address}})
    print_cursor(db.publishers.find(springer_filter))

def update_publisher_city():
    springer_filter = {"name": "Springer"}
    db.publishers.update_one(springer_filter, {"$set": {"address.city": "Frankfurt"}})
    print_cursor(db.publishers.find(springer_filter))

#update_publisher_address()
update_publisher_city()

