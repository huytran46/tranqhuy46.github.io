import './CategoryList.scss';

import {useQuery} from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';

import {fetchJokeCategories} from '../../api/joke.api';
import arrowDownPNG from '../../assets/arrow-down.png';
import arrowDownWEBP from '../../assets/arrow-down.webp';
import Button from '../Button';
import ImageWithFallback from '../ImageWithFallback';

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
  const {isLoading: loading, data: categories} = useQuery(
    ['fetchJokeCategories'],
    fetchJokeCategories,
  );

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
      <Button
        variant="outlined"
        onClick={() => setIsShowAll((prev) => !prev)}
        className={clsx(
          'cj-joke-category-list__item',
          'cj-joke-category-list__item__btn',
        )}
        rightIcon={
          <ImageWithFallback src={arrowDownWEBP} fallback={arrowDownPNG} />
        }>
        {isShowAll ? 'Show less' : 'View all'}
      </Button>
    </div>
  );
};

export default CategoryList;
