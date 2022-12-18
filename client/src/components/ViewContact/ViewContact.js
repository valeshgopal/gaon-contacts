import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { contactsData } from '../../data/contacts';
import styles from './ViewContact.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessagePopup from '../MessagePopup/MessagePopup';

const ViewContact = () => {
  const [contact, setContact] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setContact(contactsData.find((contact) => contact.id === +id));
  }, []);

  return (
    <section className={styles.contactDetails}>
      <h3>Contact Details</h3>
      <div className={styles.userContainer}>
        <AccountCircleIcon
          style={{ fontSize: 150, color: 'var(--color-primary)' }}
        />
        <div className={styles.userDetails}>
          <p>
            <span>Name:</span> {contact.name}
          </p>
          <p>
            <span>Phone:</span> {contact.phone}
          </p>
          <button className={styles.sendBtn} onClick={() => setShowPopup(true)}>
            Send Message
          </button>
          {showPopup && (
            <MessagePopup
              name={contact.name}
              phoneNumber={contact.phone}
              setShowPopup={setShowPopup}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewContact;
