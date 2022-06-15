from mongo_connect import *
import datetime
db = get_database()

def create_timeseries_collection():
    db["measures"].drop()
    db.create_collection("measures", timeseries={ 'timeField': 'timestamp', 'metaField': 'data', 'granularity': 'seconds' })

def insert_wrong_timeseries():
    db.measures.insert_one({"this": "that"})

def insert_timeseries():
    db.measures.insert_many( [
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 0),
        "temp": 12
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 4),
        "temp": 11
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 6),
        "temp": 11
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 7),
        "temp": 12
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 10),
        "temp": 16
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 12),
        "temp": 15
    }, {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 14),
        "temp": 13
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 1, 0, 0, 16),
        "temp": 12
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 2, 0, 0, 18),
        "temp": 11
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 2, 0, 0, 22),
        "temp": 12
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 2, 0, 0, 2),
        "temp": 17
    },
    {
        "metadata": { "sensorId": 5578, "type": "temperature" },
        "timestamp": datetime.datetime(2022, 1, 2, 0, 0, 26),
        "temp": 12
    }
    ] )

def query_timeseries_all():
    result = db.measures.find()
    print_cursor(result)

def query_timeseries():
    result = db.measures.find({"timestamp": datetime.datetime(2022, 1, 1, 0, 0, 26)})
    print_cursor(result)

def aggregate_timeseries():
    return db.measures.aggregate( [
   {
      "$project": {
         "date": {
            "$dateToParts": { "date": "$timestamp" }
         },
         "temp": 1
      }
   },
   {
      "$group": {
         "_id": {
            "date": {
               "year": "$date.year",
               "month": "$date.month",
               "day": "$date.day"
            }
         },
         "avgTmp": { "$avg": "$temp" }
      }
   }
] )
#create_timeseries_collection()
#insert_wrong_timeseries()
#insert_timeseries()
#query_timeseries_all()
#query_timeseries()
print_cursor(aggregate_timeseries())
