from pymongo import MongoClient
import urllib.parse

def get_database():
   username = urllib.parse.quote_plus('root')
   password = urllib.parse.quote_plus('example')

   uri = ('mongodb://%s:%s@h2908727.stratoserver.net' % (username, password))
   client = MongoClient(uri)
   database = client.training
   return database

def print_cursor(cursor):
    for e in cursor:
        print_data(e)

def print_data(data):
    print(data)






