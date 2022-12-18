import React, { useEffect, useState } from 'react';
import { contactsData } from '../../data/contacts';
import styles from './Contacts.module.css';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    setContacts(contactsData);
  }, []);
  return (
    <section className={styles.contactsSection}>
      <h3>Contacts</h3>
      <div className={styles.contacts}>
        {contacts.map((contact) => {
          return (
            <div className={styles.contact} key={contact.id}>
              <div className={styles.name}>
                <p>
                  {contact.name.length <= 15
                    ? contact.name
                    : contact.name.slice(0, 16) + '...'}
                </p>
              </div>
              <Link to={`/view-contact/${contact.id}`} className={styles.link}>
                View
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Contacts;
