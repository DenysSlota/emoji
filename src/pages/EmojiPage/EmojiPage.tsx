import { useEffect, useState } from "react"
import { EMOJI } from "../../constans/data"
import { getData } from "../../utils/getData"
import IEmoji from "../../interfaces/IEmoji"
import NavPages from "../../components/NavPages"
import EmojiList from "../../components/EmojiList"
import EmojiForm from "../../components/EmojiForm"
import CreateForm from "../../components/CreateForm"
import styles from './EmojiPage.module.css'

const EmojiPage = () => {
  const [emojis, setEmojis] = useState<IEmoji[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [editedEmoji, setEditedEmoji] = useState<IEmoji | null>(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

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
  
  // Обчислюємо індекси першого та останнього елементів на поточній сторінці
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Відбираємо 50 емодзі для показу
  const currentEmojis = emojis?.slice(indexOfFirstItem, indexOfLastItem);

  // Обчислюємо загальну кількість сторінок
  const totalPages = Math.ceil(emojis.length / itemsPerPage);

  // Змінюємо сторінку
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Видалення емодзі
  const deleteEmoji = (emojiTitle: string) => {
    setEmojis((prevEmojis) => prevEmojis.filter((emoji) => emoji.title !== emojiTitle));
  };

  // Редагування емодзі
  const editEmoji = (emoji: IEmoji) => {
    setEditedEmoji(emoji);
  };

  // Збереження змін після редагування
  const saveEditedEmoji = (editedEmoji: IEmoji) => {
    setEmojis((prevEmojis) =>
      prevEmojis.map((emoji) => (emoji.title === editedEmoji.title ? editedEmoji : emoji))
    );
    setEditedEmoji(null);
  };

  // Відміна збережень при редагуванні
  const cancelEdit = () => {
    setEditedEmoji(null);
  };

  // Додавання емодзі
  const addEmoji = (emoji: IEmoji) => {
    setEmojis((prevEmojis) => [...prevEmojis, emoji]);
    setIsCreateFormOpen(false)
  };

  // Відміна збережень при додаванні
  const cancelCreate = () => {
    setIsCreateFormOpen(false);
  };

  return (
    <div>
      <button className={styles.button__create} onClick={() => setIsCreateFormOpen(true)}>
        + create new emoji
      </button>
      {currentEmojis && 
        <EmojiList 
          currentEmojis={currentEmojis} deleteEmoji={deleteEmoji} editEmoji={editEmoji} />}       
      <NavPages totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage}/>
      {editedEmoji && <EmojiForm emoji={editedEmoji} saveEmoji={saveEditedEmoji} cancelEdit={cancelEdit}/>}
      {isCreateFormOpen && <CreateForm addEmoji={addEmoji} cancelCreate={cancelCreate}/>}
    </div>
  )
}

export default EmojiPage