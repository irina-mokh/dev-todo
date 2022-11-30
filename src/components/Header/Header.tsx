import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Search } from '../Search/Search';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isSearch, setIsSearch] = useState(false);

  const handleClose = () => {
    setIsSearch(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__wrapper">
          <Link to="/" className="header__logo">
            Dev-todo
          </Link>
          <button
            className="header__search"
            onClick={() => {
              setIsSearch(true);
            }}
          >
            Search
          </button>
          {isSearch && (
            <Modal title="Search" close={handleClose}>
              <Search />
            </Modal>
          )}
        </nav>
      </div>
    </header>
  );
};
