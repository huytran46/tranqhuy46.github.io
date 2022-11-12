import './QueryPopoverInput.scss';

import debounce from 'lodash/debounce';
import React from 'react';
import {ArrowContainer, Popover} from 'react-tiny-popover';

import searchPNG from '../../assets/search.png';
import searchWEBP from '../../assets/search.webp';
import ImageWithFallback from '../ImageWithFallback';

interface QueryPopoverInputProps<T> {
  maxLength?: number;
  defaultQuery?: string;
  onSearch: (query: string, setData: (results: T[]) => void) => Promise<void>;
  renderItems: (
    items: T[],
    props: {
      selectedItem: T | null;
      selectItemAndClosePopover: (item: T) => void;
    },
  ) => JSX.Element;
  onItemSelect?: (item: T) => void;
}

const QueryPopoverInput = <T extends object = any>(
  props: QueryPopoverInputProps<T>,
) => {
  const {
    defaultQuery = '',
    maxLength = 5,
    renderItems,
    onSearch,
    onItemSelect,
  } = props;

  const [query, setQuery] = React.useState(defaultQuery);
  const [items, setItems] = React.useState<T[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const maxListLength = React.useMemo(
    () => Math.max(0, items?.length - 1),
    [items],
  );

  const selectedItem = React.useMemo(
    () => (activeIndex != null ? items[activeIndex] : null),
    [items, activeIndex],
  );

  const debouncedOnSearch = React.useMemo(
    () => debounce(onSearch, 500),
    [onSearch],
  );

  React.useEffect(() => {
    function onKeydownHandler(e: KeyboardEvent) {
      switch (e.key.toLowerCase()) {
        case 'arrowup': {
          e.preventDefault();
          setActiveIndex((prev) => Math.max(0, (prev ?? 0) - 1));
          break;
        }
        case 'arrowdown': {
          e.preventDefault();
          setActiveIndex((prev) => Math.min(maxListLength, (prev ?? 0) + 1));
          break;
        }
        case 'enter': {
          if (selectedItem != null && onItemSelect != null) {
            e.preventDefault();
            onItemSelect(selectedItem);
          }
          setQuery('');
          break;
        }
      }
    }

    document.addEventListener('keydown', onKeydownHandler);
    return () => {
      document.removeEventListener('keydown', onKeydownHandler);
    };
  }, [maxListLength, selectedItem, onItemSelect]);

  React.useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  return (
    <Popover
      isOpen={query !== ''}
      positions={['bottom']}
      reposition
      content={({position, childRect, popoverRect}) => (
        <ArrowContainer
          className="cj-query-popover__arrow-container"
          arrowClassName="cj-query-popover__arrow"
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'white'}
          arrowSize={10}>
          <div className="cj-query-popover__arrow-body">
            {renderItems(items, {
              selectedItem,
              selectItemAndClosePopover(_selectedItem) {
                onItemSelect?.(_selectedItem);
                setQuery('');
              },
            })}
          </div>
        </ArrowContainer>
      )}>
      <div className="cj-query-popover__input-group">
        <input
          value={query}
          type="text"
          className="cj-query-popover__input-group__search-input"
          placeholder="How can we make you laugh today?"
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedOnSearch(e.target.value, (data) => {
              setItems(data?.slice(0, maxLength));
            });
          }}
        />
        <ImageWithFallback
          className="cj-query-popover__input-group__search-input__icon"
          src={searchWEBP}
          fallback={searchPNG}
        />
      </div>
    </Popover>
  );
};

export default QueryPopoverInput;
