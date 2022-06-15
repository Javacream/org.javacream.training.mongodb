from mongo_connect import *

def find_books():
    db = get_database()
    return db["books"].find({"isbn": {"$exists": True}})

def find_publishers():
    db = get_database()
    return db["publishers"].find({"name": {"$exists": True}})

def find_authors():
    db = get_database()
    return db["authors"].find({"lastname": {"$exists": True}})

def insert_wrong():
    db = get_database()
    db.books.insert_one({"name": "Hugo"})

def publisher_books_lookup():
    db = get_database()
    match = {"$match": {"name": "Addison"}}
    lookup = {"$lookup": {
        "from": "books",
        "as": "book",
        "localField": "books.oids",
        "foreignField": "_id"
        }
    }
    projection = {"$project": {
        "_id": 0, "name":1, "book.title": 1, "book.price":1
        }
    }
    pipeline = [match, lookup, projection]
    return db["publishers"].aggregate(pipeline)


#print_cursor(publisher_books_lookup())
#print_cursor(find_books())
#print_cursor(find_publishers())
#print_cursor(find_authors())
#insert_wrong()