import './CategoryList.scss';

import clsx from 'clsx';
import React from 'react';

import {fetchJokeCategories} from '../../api/joke.api';
import {useAsync} from '../../hooks/use_async';

const INIT_NUMBER_OF_CATEGORIES = 5;
const AVAILABLE_COLOR_CLASS_NAMES = [
  'cj-joke-category-list__item--danger',
  'cj-joke-category-list__item--pastel-orange',
  'cj-joke-category-list__item--pale-orange',
  'cj-joke-category-list__item--light-gold',
  'cj-joke-category-list__item--kiwi-green',
  'cj-joke-category-list__item--weird-green',
  'cj-joke-category-list__item--info',
];

interface CategoryListProps {
  onCategoryClick(cateId: string): void;
}

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const {onCategoryClick} = props;
  const {loading, value: categories} = useAsync(fetchJokeCategories);
  const [isShowAll, setIsShowAll] = React.useState(false);

  const firstSixCategories = React.useMemo(
    () => categories?.slice(0, INIT_NUMBER_OF_CATEGORIES) ?? [],
    [categories],
  );

  const getColorCssClassName = (index: number): string =>
    AVAILABLE_COLOR_CLASS_NAMES[index % AVAILABLE_COLOR_CLASS_NAMES.length];

  if (loading || categories == null) {
    return <>loading..</>;
  }

  return (
    <div className="cj-joke-category-list">
      {(isShowAll ? categories : firstSixCategories).map((category, idx) => (
        <span
          key={idx}
          className={clsx(
            'cj-joke-category-list__item',
            getColorCssClassName(idx),
          )}
          onClick={() => onCategoryClick(category)}>
          {category}
        </span>
      ))}
      <button
        onClick={() => setIsShowAll((prev) => !prev)}
        className={clsx('cj-joke-category-list__item')}>
        {isShowAll ? 'Show less' : 'View all'}
      </button>
    </div>
  );
};

export default CategoryList;
