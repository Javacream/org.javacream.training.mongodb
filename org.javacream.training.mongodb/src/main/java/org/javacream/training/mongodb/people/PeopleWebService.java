package org.javacream.training.mongodb.people;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class PeopleWebService {

	@Autowired private PeopleRepository peopleRepository;

	@PostMapping(path = "api/people/{lastname}/{firstname}")
	public String create(@PathVariable("lastname") String lastname, @PathVariable("firstname") String firstname) {
		Person toCreate = new Person(lastname, firstname, null);
		Person created = peopleRepository.insert(toCreate);
		return created.getPersonId();
	}
	@GetMapping(path = "api/people/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Person findById(@PathVariable("id") String id) {
		Optional<Person> found = peopleRepository.findById(id);
		if (found.isPresent()) {
			return found.get();
		}else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping(path = "api/people", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Person> search(@RequestParam (name = "lastname", required = false) String lastname, @RequestParam (name = "firstname", required = false) String firstname, @RequestParam (name = "height", required = false) Integer height) {
		return peopleRepository.findAll(Example.of(new Person(lastname, firstname, height)));
	}
	@DeleteMapping(path = "api/people/{id}")
	public void delete(@PathVariable("id") String id) {
		peopleRepository.deleteById(id);
	}
	@PutMapping(path = "api/people")
	public void update(@RequestBody Person person) {
		peopleRepository.save(person);
	}
}
