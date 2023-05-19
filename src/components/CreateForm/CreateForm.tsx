import { useState } from "react";
import IEmoji from "../../interfaces/IEmoji";
import styles from './CreateForm.module.css'

interface CreateFormProps {    
    addEmoji: (emoji: IEmoji) => void;
    cancelCreate: () => void;
  }


const CreateForm: React.FC<CreateFormProps> = ({ addEmoji, cancelCreate }) => {    
    const [title, setTitle] = useState('');
    const [symbol, setSymbol] = useState('');
    const [keywords, setKeywords] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newEmoji: IEmoji = {
          title,
          symbol,
          keywords,
        };
        addEmoji(newEmoji);
      };
      
    return (
      <div className={styles.container}>
          <h3 className={styles.header}>Edit emoji</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label>Symbol:</label>
              <input type="text" name="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
              <label>Keywords:</label>
              <textarea rows={3} name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              <button type="submit">Save</button>
              <button type="button" onClick={cancelCreate}>Cancel</button>
          </form>
      </div>
    );
  };

export default CreateForm