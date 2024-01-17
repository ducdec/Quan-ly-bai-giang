import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

//import * as searchServices from '~/services/searchServices';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import { searchService } from '~/services/searchServices';

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(true);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      try {
        const result = await searchService.courseSearch(debouncedValue);
        setSearchResult(result);
        setHasSearchResults(result.length > 0);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [debouncedValue]);

  // Handle functions
  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleInput = (e) => {
    const searchValue = e.target.value; // Remove leading and trailing whitespaces
    setSearchValue(searchValue);
  };
  //console.log(searchResult);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    // fix err Tippy <div> or <span>
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult?.length > 0}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              {hasSearchResults ? (
                <div>
                  <h4 className={cx('search-title')}>Course</h4>
                  {searchResult.map((result) => (
                    <AccountItem key={result._id} data={result} />
                  ))}
                </div>
              ) : (
                <p>No courses found</p>
              )}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search videos"
            spellCheck={false}
            onChange={handleInput}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />
          )}
          <button
            className={cx('search-btn')}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
