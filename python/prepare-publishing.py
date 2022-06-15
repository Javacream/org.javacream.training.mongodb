from mongo_connect import *

def create_schema():
   db = get_database()
   db.publishers.drop()
   db.books.drop()
   db.authors.drop()
   db.create_collection("publishers")
   db.create_collection("authors")
   db.create_collection("books",
   validator =  {
      "$jsonSchema": {
         "bsonType": "object",
         "required": [ "isbn", "title", "pages", "description", "price", "version" ],
         "properties": {
            "publisher": {
               "bsonType": "objectId",
               "description": "must be an objectId and is required"
            },
            "version": {
               "bsonType": "int",
               "description": "must be a long and is required"
            },

            "isbn": {
               "bsonType": "string",
               "description": "must be a string and is required"
            },
            "title": {
               "bsonType": "string",
               "description": "must be a string and is required"
            },
            "pages": {
               "bsonType": "int",
               "minimum": 0,
               "description": "must be an integer greater than 0 and is required"
            },
            "description": {
               "bsonType": "string",
               "description": "description must be set"
            },
            "price": {
               "bsonType": "double",
               "minimum": 0,
               "description": "must be an double greater than 0 and is required"
            },
            "tags": {
               "bsonType": "array",
               "description": "if exists must be a string[]",
               "items": {
                  "bsonType": "string"
               }
            }
         }
      }
   })


def create_documents():
   db = get_database()
   books = []
   for i in range(1,10):
      book = {"version": 0, "isbn": "ISBN"+str(i), "title": "Title" + str(i), "price": 0.99 + i, "pages": 50*i, "description": "a book about computer science", "authorName": ["Rainer Sawitzki"]}
      books.append(book)
   bookForAddison = {"version": 0, "isbn": "ISBN42", "title": "Title42", "price": 42.99, "pages": 999, "description": "a sports book", "authorName": ["Georg Metzger", "Hans Meier"]};
   bookForAddison2 = {"version": 0, "isbn": "ISBN43", "title": "Title43", "price": 4.99, "pages": 999, "description": "a sports book", "authorName": ["Georg Metzger", "Hans Meier"]};
   springer = {"version": 0, "name": "Springer", "address": {"city": "Berlin", "street": "Alexanderplatz"}, "books": []}
   authors = [{"version": 0, "lastname": "Sawitzki", "firstname": "Rainer", "isbns":[]}, {"lastname": "Metzger", "firstname": "Georg", "isbns":[]}, {"lastname": "Meier", "firstname": "Hans", "isbns":[]}]
   authors[1]["isbns"].append(bookForAddison["isbn"])
   authors[2]["isbns"].append(bookForAddison["isbn"])
   for book in books:
      springer["books"].append(book["isbn"])
      book["publisherName"] = springer["name"]
      authors[0]["isbns"].append(book["isbn"])
   addison = {"version": 0, "name": "Addison", "address": {"city": "Berlin", "street": "Alexanderplatz"}, "books": [bookForAddison]}
   bookForAddison["publisherName"] = addison["name"]    
   bookForAddison2["publisherName"] = addison["name"]
   oidsForSpringerBooks = db.books.insert_many(books)
   oidForAddisonBooks = db["books"].insert_many([bookForAddison, bookForAddison2])
   springer["books"] = {"oids": oidsForSpringerBooks.inserted_ids}
   addison["books"] = {"oids": oidForAddisonBooks.inserted_ids}
   oidForPublisherSpringer = db["publishers"].insert_one(springer)
   oidForPublisherAddison = db["publishers"].insert_one(addison)
   db.books.update_many({"_id": {"$in": springer["books"]["oids"]}}, {"$set": {"publisher": oidForPublisherSpringer.inserted_id}})
   db.books.update_many({"_id": {"$in": addison["books"]["oids"]}}, {"$set": {"publisher": oidForPublisherAddison.inserted_id}})
   db["authors"].insert_many(authors)

create_schema()
create_documents()
