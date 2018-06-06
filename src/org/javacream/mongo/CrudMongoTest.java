package org.javacream.mongo;

import org.junit.Assert;
import org.junit.Test;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteConcern;

public class CrudMongoTest extends BaseMongoTest{

	private static Object id;
	@Test
	public void testInsert() throws Exception {
		DB db = mongoClient.getDB("javacream");
		DBCollection people = db.getCollection("people");
		BasicDBObjectBuilder builder = new BasicDBObjectBuilder();
		builder.add("lastname", "Sawitzki").add("givenNames", new String[]{"Rainer", "Ulrich"});
		DBObject newPerson = builder.get();
		id = newPerson.get("_id");
		Assert.assertNull(id);
		people.insert(newPerson, new WriteConcern(true));
		id = newPerson.get("_id");
		Assert.assertNotNull(id);
	}

	@Test
	public void testFindAll() throws Exception {
		DB db = mongoClient.getDB("javacream");
		DBCollection people = db.getCollection("people");
		BasicDBObjectBuilder builder = new BasicDBObjectBuilder();
		DBCursor cursor = people.find(builder.add("lastname", "Sawitzki").add("givenNames", new String[]{"Rainer", "Ulrich"}).get());
		while (cursor.hasNext()) {
			DBObject person = cursor.next();
			System.out.println(person);
		}
		System.out.println("________________________________");

	}
	@Test
	public void testFindCreated() throws Exception {
		DB db = mongoClient.getDB("javacream");
		DBCollection people = db.getCollection("people");
		BasicDBObjectBuilder builder = new BasicDBObjectBuilder();
		DBObject created = people.findOne(builder.add("_id", id).get());
		Assert.assertNotNull(created);
		System.out.println("________________________________");

	}

	@Test
	public void testUpdateCreated() throws Exception {
		DB db = mongoClient.getDB("javacream");
		DBCollection people = db.getCollection("people");
		BasicDBObjectBuilder query = new BasicDBObjectBuilder();
		BasicDBObjectBuilder update = new BasicDBObjectBuilder();
		BasicDBList basicDBList = new BasicDBList();
		basicDBList.add("Egon");
		people.update(query.add("_id", id).get(), update.add("$set", basicDBList).get());
		DBObject created = people.findOne(query.get());
		System.out.println(created);
		System.out.println("________________________________");

	}

}
