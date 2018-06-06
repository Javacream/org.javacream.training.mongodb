package org.javacream.mongo;

import java.net.UnknownHostException;

import org.junit.BeforeClass;

import com.mongodb.MongoClient;

public abstract class BaseMongoTest {

	static MongoClient mongoClient;

	@BeforeClass
	public static void setUpClass() {
		try {
			mongoClient = new MongoClient("localhost");
		} catch (UnknownHostException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}


}
