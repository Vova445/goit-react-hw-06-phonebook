import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Phonebook.module.css";
import ContactForm from "./Refactor/ContactForm";
import Filter from "./Refactor/Filter";
import ContactList from "./Refactor/ContactList";
import { nanoid } from "nanoid";
import { saveContact, deleteContact, updateFilter } from "../../Redux/contactSlice"; 

const Phonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [showDeleted] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      dispatch(saveContact(storedContacts));
    }
  }, [dispatch]);
  

  useEffect(() => {
    localStorage.clear();
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
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(saveContact(newContact));
    setName("");
    setNumber("");
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (value) => {
    dispatch(updateFilter(value));
  };

  const filteredContacts = showDeleted
    ? contacts
    : contacts.filter(
        (contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm name={name} number={number} onChange={change} onSubmit={submit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default Phonebook;