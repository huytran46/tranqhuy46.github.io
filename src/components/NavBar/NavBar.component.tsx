import './NavBar.scss';

import clsx from 'clsx';
import React from 'react';

import chevronDownSolidPNG from '../../assets/chevron-down-solid.png';
import chevronDownSolidWEBP from '../../assets/chevron-down-solid.webp';
import personPNG from '../../assets/person.png';
import personWEBP from '../../assets/person.webp';
import ImageWithFallback from '../ImageWithFallback';

const LI_ITEM_KEY_MAP: Record<string, string> = {
  so_funktioniert_s: 'so_funktioniert_s',
  sonderangebote: 'sonderangebote',
  mein_bereich: 'mein_bereich',
};

interface AppNavItemProps {
  isActive?: boolean;
  onClick?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
  icon?: JSX.Element;
  rightElement?: JSX.Element;
}

const AppNavItem: React.FC<React.PropsWithChildren<AppNavItemProps>> = (
  props,
) => {
  const {
    isActive = false,
    onClick,
    onMouseOver,
    icon,
    rightElement,
    children,
  } = props;
  return (
    <li
      className={clsx('cj-navbar__ul__li', {
        'cj-navbar__ul__li--active': isActive,
      })}
      onClick={onClick}
      onMouseOver={onMouseOver}>
      {icon != null && <span className="cj-navbar__ul__li__icon">{icon}</span>}
      <span className="cj-navbar__ul__li__content">{children}</span>
      {rightElement != null && (
        <span className="cj-navbar__ul__li__append">{rightElement}</span>
      )}
    </li>
  );
};

const AppNavbar: React.FC = () => {
  const [activeNavId, setActiveNavId] = React.useState<string | null>(null);

  function activateNavItem(key: string) {
    return () => setActiveNavId(key);
  }

  return (
    <nav className="cj-navbar">
      <ul className="cj-navbar__ul">
        <AppNavItem
          key={LI_ITEM_KEY_MAP['so_funktioniert_s']}
          isActive={activeNavId === LI_ITEM_KEY_MAP['so_funktioniert_s']}
          onClick={activateNavItem(LI_ITEM_KEY_MAP['so_funktioniert_s'])}
          onMouseOver={activateNavItem(LI_ITEM_KEY_MAP['so_funktioniert_s'])}>
          so funktioniert's
        </AppNavItem>

        <AppNavItem
          key={LI_ITEM_KEY_MAP['sonderangebote']}
          isActive={activeNavId === LI_ITEM_KEY_MAP['sonderangebote']}
          onClick={activateNavItem(LI_ITEM_KEY_MAP['sonderangebote'])}
          onMouseOver={activateNavItem(LI_ITEM_KEY_MAP['sonderangebote'])}>
          sonderangebote
        </AppNavItem>

        <AppNavItem
          key={LI_ITEM_KEY_MAP['mein_bereich']}
          isActive={activeNavId === LI_ITEM_KEY_MAP['mein_bereich']}
          onMouseOver={activateNavItem(LI_ITEM_KEY_MAP['mein_bereich'])}
          onClick={activateNavItem(LI_ITEM_KEY_MAP['mein_bereich'])}
          icon={
            <ImageWithFallback
              className="cj-nav-item-icon"
              src={personWEBP}
              fallback={personPNG}
              alt="Person icon of menu item"
            />
          }
          rightElement={
            <ImageWithFallback
              className="cj-nav-item-icon"
              src={chevronDownSolidWEBP}
              fallback={chevronDownSolidPNG}
              style={{marginBottom: 4}}
              alt="Person icon of menu item"
            />
          }>
          mein bereich
        </AppNavItem>
      </ul>
    </nav>
  );
};

export default AppNavbar;
