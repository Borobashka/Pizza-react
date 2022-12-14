import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import closeSvg from '../../assets/img/close.svg';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    [],
  );

  const onChangeInput = event => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  React.useEffect(() => {}, []);

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput} // при вводе текста в input, значение сохраняется в контекст
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {SearchContext && (
        <img
          onClick={onClickClear} // если кликнуть на крестик, то в input присваивается пустое значение
          className={styles.clearIcon}
          src={closeSvg}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
