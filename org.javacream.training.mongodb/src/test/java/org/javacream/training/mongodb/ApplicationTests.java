package org.javacream.training.mongodb;

import java.util.List;

import org.javacream.training.mongodb.people.PeopleRepository;
import org.javacream.training.mongodb.people.Person;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootTest
class ApplicationTests {
	@Autowired
	private MongoTemplate template;
	@Autowired
	private PeopleRepository peopleRepository;

	@Test
	void contextLoads() {
		System.out.println("Injected Template:" + template);
		System.out.println("Injected Repository:" + peopleRepository);
	}

	@Test
	void testTemplate() {
		template.insert(new Person("Metzger", "Rainer", 183));
	}
	@Test
	void testRepository() {
		System.out.println(peopleRepository.count());
		List<Person> result = peopleRepository.findAll(Example.of(new Person ("Metzger", null, null)));
		System.out.println(result);
	}
	

}
