import { useEffect, useState } from "react"
import IEmoji from "../../interfaces/IEmoji"
import { EMOJI } from "../../constans/data"
import { getData } from "../../utils/getData"
import EmojiList from "../../components/EmojiList"
import styles from './SearchPage.module.css'
import EmojiForm from "../../components/EmojiForm"

const SearchPage = () => {
    const [emojis, setEmojis] = useState<IEmoji[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<IEmoji[]>([])
    const [editedEmoji, setEditedEmoji] = useState<IEmoji | null>(null);  

    async function getEmoji(): Promise<void> {
        try {
          const data: IEmoji[] = await getData(EMOJI);
          setEmojis(data)    
        } catch (error) {
          console.error('An error occurred while receiving data:', error);
        }
      }
    
      useEffect(()=>{
        getEmoji()
      }, [])

    // Обробник зміни запиту пошуку
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);        
        if (searchQuery.length > 1){
            const updateEmojis = emojis.filter((emoji) =>                 
                emoji.keywords.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilter(updateEmojis)
        } else {
            setFilter([])
        }
    };

    // Видалення емодзі
    const deleteEmoji = (emojiTitle: string) => {
        setFilter((prevFilter) => prevFilter?.filter((emoji) => emoji.title !== emojiTitle));
    };

    // Редагування емодзі
    const editEmoji = (emoji: IEmoji) => {
        setEditedEmoji(emoji);
    };

    // Збереження змін після редагування
    const saveEditedEmoji = (editedEmoji: IEmoji) => {
        setFilter((prevFilter) =>
        prevFilter.map((emoji) => (emoji.title === editedEmoji.title ? editedEmoji : emoji))
    );
    setEditedEmoji(null);
  };

  // Відміна збережень при редагуванні
  const cancelEdit = () => {
    setEditedEmoji(null);
  };
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." />
      {filter.length > 0 ? (
        <EmojiList currentEmojis={filter} deleteEmoji={deleteEmoji} editEmoji={editEmoji} />
      ) : (
        <p className={styles.info}>No emojis found.</p>
      )}
      {editedEmoji && <EmojiForm emoji={editedEmoji} saveEmoji={saveEditedEmoji} cancelEdit={cancelEdit}/>}      
    </div>
  )
}

export default SearchPage