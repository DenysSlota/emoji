import React, { useState } from 'react';
import IEmoji from '../../interfaces/IEmoji'
import styles from './EmojiForm.module.css'

interface EmojiFormProps {
  emoji: IEmoji;
  saveEmoji: (emoji: IEmoji) => void;
  cancelEdit: () => void;
}

const EmojiForm: React.FC<EmojiFormProps> = ({ emoji, saveEmoji, cancelEdit }) => {
  const [editedEmoji, setEditedEmoji] = useState(emoji);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedEmoji((prevEmoji) => ({
      ...prevEmoji,
      [name]: value,
    }));
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedEmoji((prevEmoji) => ({
      ...prevEmoji,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveEmoji(editedEmoji);
  };

  return (
    <div className={styles.container}>
        <h3 className={styles.header}>Edit emoji</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={editedEmoji.title} onChange={handleChange} />
            <label>Symbol:</label>
            <input type="text" name="symbol" value={editedEmoji.symbol} onChange={handleChange} />
            <label>Keywords:</label>
            <textarea rows={3} name="keywords" value={editedEmoji.keywords} onChange={handleTextareaChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
    </div>
  );
};

export default EmojiForm;