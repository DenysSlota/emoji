import IEmoji from "../../interfaces/IEmoji"
import styles from './EmojiList.module.css'

interface EmojiListProps {
    currentEmojis: IEmoji[];
    deleteEmoji: (emojiTitle: string) => void;
    editEmoji: (emoji: IEmoji) => void;
}

const EmojiList: React.FC<EmojiListProps> = ({ currentEmojis, deleteEmoji, editEmoji }) => {
  return (
    <div className={styles.list__container}>
        {currentEmojis.map((emoji)=> (
        <div className={styles.list__item} key={emoji.title}>
          <h3>{emoji.title}</h3>
          <p className={styles.symbol}>{emoji.symbol}</p>
          <div className={styles.button__container}>
            <button onClick={() => editEmoji(emoji)}>Edit</button>
            <button onClick={()=>deleteEmoji(emoji.title)}>Delete</button>
          </div>
          <p className={styles.keywords}>{emoji.keywords}</p>
        </div>
      ))}
    </div>
  )
}

export default EmojiList