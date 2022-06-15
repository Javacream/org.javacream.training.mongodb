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

def add_book_to_publisher(publisher, book):
    old_publisher_id = book["publisher"]
    with db.client.start_session() as session:
        with session.start_transaction():
            db.publishers.update_one({"_id": old_publisher_id}, {"$pull": {"books.oids": book["_id"]}})
            db.publishers.update_one({"_id": publisher["_id"]}, {"$addToSet": {"books.oids": book["_id"]}})
            db.books.update_one({"_id": book["_id"]}, {"$set": {"publisher": publisher["_id"]}})
#update_publisher_address()
#update_publisher_city()

add_book_to_publisher(db.publishers.find_one({"name": "Springer"}), db.books.find_one({"isbn": "ISBN43"}));
