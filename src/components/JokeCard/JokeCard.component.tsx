import './JokeCard.scss';

import clsx from 'clsx';
import React from 'react';

import arrowRightWEBP from '../../assets/arrow-right.png';
import arrowRightPNG from '../../assets/arrow-right.webp';
import yellowBoltPNG from '../../assets/yellow-bolt.png';
import yellowBoltWEBP from '../../assets/yellow-bolt.webp';
import Button from '../Button';
import ImageWithFallback from '../ImageWithFallback';

interface JokeCardProps {
  title: string;
  description: string;
  category?: string;
  iconUrl?: string;
  onSeeStatsClick?: () => void;
  mode?: 'preview' | 'normal';
}

const DefaultJokeCardIcon = () => (
  <ImageWithFallback
    className="cj-default-prefix-icon"
    src={yellowBoltWEBP}
    fallback={yellowBoltPNG}
    alt="A joke card prefix icon"
  />
);

const JokeCard: React.FC<JokeCardProps> = (props) => {
  const {
    mode = 'normal',
    title,
    description,
    category,
    iconUrl,
    onSeeStatsClick,
  } = props;

  return (
    <div
      className={clsx('cj-joke-card', {
        'cj-joke-card--preview': mode === 'preview',
      })}>
      <div className="cj-joke-card__header__container">
        {category && <span className="cj-joke-card__category">{category}</span>}
        <div className="cj-joke-card__header">
          <span className="cj-joke-card__icon">
            {iconUrl == null ? (
              <DefaultJokeCardIcon />
            ) : (
              <ImageWithFallback
                className="cj-default-prefix-icon"
                src={iconUrl}
                fallback={yellowBoltPNG}
                alt="A joke card prefix icon"
              />
            )}
          </span>
          <span className="cj-joke-card__title">{title}</span>
        </div>
      </div>
      <div className="cj-joke-card__body">
        <div className="cj-joke-card__copy">{description}</div>
      </div>
      {onSeeStatsClick != null && (
        <div className="cj-joke-card__footer">
          <div className="cj-joke-card__actions">
            <Button
              variant="ghost"
              className="cj-joke-card__actions__button"
              rightIcon={
                <ImageWithFallback
                  src={arrowRightWEBP}
                  fallback={arrowRightPNG}
                  alt="A joke card see stat button icon"
                />
              }
              onClick={onSeeStatsClick}>
              see stats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JokeCard;
