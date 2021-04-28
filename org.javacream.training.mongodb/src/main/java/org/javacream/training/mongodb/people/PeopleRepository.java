package org.javacream.training.mongodb.people;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PeopleRepository extends MongoRepository<Person, String>{

}
