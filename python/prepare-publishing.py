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
         "required": [ "isbn", "title", "pages", "description", "price" ],
         "properties": {
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
            }
         }
      }
   })


def create_documents():
   db = get_database()
   books = []
   for i in range(1,10):
      book = {"isbn": "ISBN"+str(i), "title": "Title" + str(i), "price": 0.99 + i, "pages": 50*i, "description": "a book about computer science", "authorName": ["Rainer Sawitzki"]}
      books.append(book)
   bookForAddison = {"isbn": "ISBN42", "title": "Title42", "price": 42.99, "pages": 999, "description": "a sports book", "authorName": ["Georg Metzger", "Hans Meier"]};
   bookForAddison2 = {"isbn": "ISBN43", "title": "Title43", "price": 4.99, "pages": 999, "description": "a sports book", "authorName": ["Georg Metzger", "Hans Meier"]};
   springer = {"name": "Springer", "address": {"city": "Berlin", "street": "Alexanderplatz"}, "books": []}
   authors = [{"lastname": "Sawitzki", "firstname": "Rainer", "isbns":[]}, {"lastname": "Metzger", "firstname": "Georg", "isbns":[]}, {"lastname": "Meier", "firstname": "Hans", "isbns":[]}]
   authors[1]["isbns"].append(bookForAddison["isbn"])
   authors[2]["isbns"].append(bookForAddison["isbn"])
   for book in books:
      springer["books"].append(book["isbn"])
      book["publisherName"] = springer["name"]
      authors[0]["isbns"].append(book["isbn"])
   addison = {"name": "Addison", "address": {"city": "Berlin", "street": "Alexanderplatz"}, "books": [bookForAddison]}
   bookForAddison["publisherName"] = addison["name"]    
   bookForAddison2["publisherName"] = addison["name"]
   oidsForSpringerBooks = db.books.insert_many(books)
   oidForAddisonBook = db["books"].insert_many([bookForAddison, bookForAddison2])
   springer["books"] = {"oids": oidsForSpringerBooks.inserted_ids}
   addison["books"].append({"oids": oidForAddisonBook.inserted_ids})
   db["publishers"].insert_one(springer)
   db["publishers"].insert_one(addison)
   db["authors"].insert_many(authors)


create_schema()
create_documents()
