import React, { useEffect, useState } from 'react';
import styles from './Messages.module.css';
import moment from 'moment';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    };

    getMessages();
  }, []);
  return (
    <section className={styles.messages}>
      <h3>Messages Sent</h3>
      {messages.length === 0 && (
        <p style={{ color: 'var(--color-primary)' }}>No messages sent!</p>
      )}
      {messages.map((message) => {
        return (
          <div className={styles.messageContainer} key={message._id}>
            <p className={styles.msgName}>To: {message.name}</p>
            <p className={styles.msg}>{message.msg}</p>
            <p className={styles.date}>
              {moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default Messages;
