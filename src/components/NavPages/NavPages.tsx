import styles from './NavPages.module.css'

interface NavPagesProps {
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
}

const NavPages: React.FC<NavPagesProps> = ({totalPages, handlePageChange, currentPage}) => {
    
  return (
    <div className={styles.container}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              className={styles.button}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
  )
}

export default NavPages