import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Search } from '../Search/Search';

export const Header = () => {
  const [isSearch, setIsSearch] = useState(false);

  const handleClose = () => {
    setIsSearch(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__wrapper">
          <a href="/" className="header__logo">
            Dev-todo
          </a>
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
              <Search></Search>
            </Modal>
          )}
        </nav>
      </div>
    </header>
  );
};
