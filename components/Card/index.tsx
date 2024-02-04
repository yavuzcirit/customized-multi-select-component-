import React from 'react';
import Image from 'next/image';
import './card.scss';

interface ICard {
  imgUrl: string;
  episodes: number;
  name: string;
  searchInput: string;
}

const highlightSearchInput = (name: string, searchInput: string) => {
  const index = name.toLowerCase().indexOf(searchInput.toLowerCase());

  if (index !== -1) {
    return (
      <>
        {name.substring(0, index)}
        <span className="highlight">{name.substring(index, index + searchInput.length)}</span>
        {name.substring(index + searchInput.length)}
      </>
    );
  }

  return name;
};

const Card = ({ imgUrl, episodes, name, searchInput }: ICard) => {
  return (
    <div className='card'>
      <div className='card__img'>
        <Image src={imgUrl} alt='profile' height={50} width={50} />
      </div>
      <div className='card__data'>
        <span className='card__data__name'>{highlightSearchInput(name, searchInput)}</span>
        <span className='card__data__episodes'>{episodes} Episodes</span>
      </div>
    </div>
  );
};

export default Card;
