package org.javacream.training.mongodb.people;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "people")
public class Person {
   @Id
   private String personId;
   private String lastname;
   private String firstname;
   private Integer height;
public Person() {
	super();
	// TODO Auto-generated constructor stub
}
public Person(String lastname, String firstname, Integer height) {
	super();
	this.lastname = lastname;
	this.firstname = firstname;
	this.height = height;
}
@Override
public String toString() {
	return "Person [personId=" + personId + ", lastname=" + lastname + ", firstname=" + firstname + ", height=" + height
			+ "]";
}
public String getPersonId() {
	return personId;
}
public void setPersonId(String personId) {
	this.personId = personId;
}
public String getLastname() {
	return lastname;
}
public void setLastname(String lastname) {
	this.lastname = lastname;
}
public String getFirstname() {
	return firstname;
}
public void setFirstname(String firstname) {
	this.firstname = firstname;
}
public Integer getHeight() {
	return height;
}
public void setHeight(Integer height) {
	this.height = height;
}
@Override
public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((firstname == null) ? 0 : firstname.hashCode());
	result = prime * result + ((height == null) ? 0 : height.hashCode());
	result = prime * result + ((lastname == null) ? 0 : lastname.hashCode());
	result = prime * result + ((personId == null) ? 0 : personId.hashCode());
	return result;
}
@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	Person other = (Person) obj;
	if (firstname == null) {
		if (other.firstname != null)
			return false;
	} else if (!firstname.equals(other.firstname))
		return false;
	if (height == null) {
		if (other.height != null)
			return false;
	} else if (!height.equals(other.height))
		return false;
	if (lastname == null) {
		if (other.lastname != null)
			return false;
	} else if (!lastname.equals(other.lastname))
		return false;
	if (personId == null) {
		if (other.personId != null)
			return false;
	} else if (!personId.equals(other.personId))
		return false;
	return true;
}

}