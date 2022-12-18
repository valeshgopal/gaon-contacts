import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import classNames from 'classnames';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  return (
    <div className={styles.sidebar}>
      <Link
        to='/'
        className={classNames(styles.link, {
          [styles.activeTab]: activeTab === 'contacts',
        })}
        onClick={() => setActiveTab('contacts')}
      >
        <PhoneIcon fontSize='small' />
        <p>Contacts</p>
      </Link>
      <Link
        to='/messages'
        className={classNames(styles.link, {
          [styles.activeTab]: activeTab === 'messages',
        })}
        onClick={() => setActiveTab('messages')}
      >
        <MailIcon fontSize='small' />
        <p>Messages</p>
      </Link>
    </div>
  );
};

export default Sidebar;
