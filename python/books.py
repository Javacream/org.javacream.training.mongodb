from mongo_connect import *

db = get_database()

def add_tag_to_book(isbn, tag):
    return db.books.update_one({"isbn": isbn}, {"$addToSet": {"tags": tag}})

def remove_tag_from_book(isbn, tag):
    return db.books.update_one({"isbn": isbn}, {"$pull": {"tags": tag}})

def find_book_with_all_tags(tags):
    return db.books.find({"tags": tags})
def find_book_with_tag(tag):
    return db.books.find({"tags": tag})

search_tags = ["sports", "science"]
add_tag_to_book("ISBN42", "sports")
add_tag_to_book("ISBN42", "science")
print_cursor(find_book_with_all_tags(search_tags))
print_cursor(find_book_with_tag("sports"))
remove_tag_from_book("ISBN42", "science")
print_cursor(find_book_with_all_tags(search_tags))
print_cursor(find_book_with_tag("science"))
