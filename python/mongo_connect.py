from pymongo import MongoClient
import urllib.parse

import urllib.parse

def get_database():
   username = urllib.parse.quote_plus('root')
   password = urllib.parse.quote_plus('example')

   uri = ('mongodb://%s:%s@h2908727.stratoserver.net' % (username, password))
   client = MongoClient(uri)
   database = client.training
   return database

