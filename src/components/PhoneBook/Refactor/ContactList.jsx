import React from "react";
import styles from '../Phonebook.module.css';

const ContactList = ({ contacts, deleteContact, clearContacts }) => (
  <div>
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => deleteContact(contact.id)} className={styles.deleteButton}>Delete</button>
        </li>
      ))}
    </ul>
    <button onClick={clearContacts} className={styles.clearContactsButton}>Clear Contacts</button>
  </div>
);

export default ContactList;
