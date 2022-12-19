import React, { useState, useEffect } from 'react';
import styles from './MessagePopup.module.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useToast } from '@chakra-ui/react';

const MessagePopup = ({ name, phoneNumber, setShowPopup }) => {
  const [msg, setMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const generateOTP = () => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      setMsg(`Hi. Your OTP is: ${otp}`);
    };
    generateOTP();
    setPhone(phoneNumber);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = { name, msg, phoneNumber };

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    const json = JSON.parse(data);

    if (!response.ok) {
      setSending(false);
      toast({
        title: 'Something went wrong!',
        description: json.result,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setShowPopup(false);
      toast({
        title: 'Success!',
        description: 'OTP has been sent successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <section className={styles.popupContainer}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>Compose Message</h3>
          <CancelOutlinedIcon
            fontSize='medium'
            style={{ color: 'var(--color-primary)', cursor: 'pointer' }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form className={styles.popupForm} onSubmit={onSubmit}>
          <label htmlFor='recipient'>Recipient</label>
          <input
            type='text'
            name='recipient'
            id='recipient'
            value={name}
            placeholder='Enter recipient name'
            required
            disabled
          />
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter phone number'
            name='phoneNumber'
            id='phoneNumber'
            pattern='^[+]91[6789][0-9]{9}'
            title='Please enter valid phone number'
            required
          />
          <label htmlFor='message'>Message</label>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder='Enter your message'
            name='message'
            id='message'
            required
          />
          <button
            type='submit'
            className={styles.sendBtn}
            onClick={() => msg && phone && setSending(true)}
          >
            {msg && phone && sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default MessagePopup;
