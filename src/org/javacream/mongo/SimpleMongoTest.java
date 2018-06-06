package org.javacream.mongo;

import org.junit.Test;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class SimpleMongoTest extends BaseMongoTest {

	@Test
	public void testConnection() throws Exception {
		DB db = mongoClient.getDB("javacream");
		DBCollection people = db.getCollection("people");
		DBCursor cursor = people.find();
		while (cursor.hasNext()) {
			DBObject person = cursor.next();
			System.out.println(person);
			System.out.println(person.get("name"));
		}
	}

}
