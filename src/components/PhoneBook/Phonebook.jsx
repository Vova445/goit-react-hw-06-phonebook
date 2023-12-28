import React, { useState, useEffect } from "react";
import styles from "./Phonebook.module.css";
import ContactForm from "./Refactor/ContactForm";
import Filter from "./Refactor/Filter";
import ContactList from "./Refactor/ContactList";
import { nanoid } from "nanoid";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [showDeleted] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const change = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    setName("");
    setNumber("");
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredContacts = showDeleted
    ? contacts
    : contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm name={name} number={number} onChange={change} onSubmit={submit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default Phonebook;