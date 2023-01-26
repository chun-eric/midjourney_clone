import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils'

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className=''>
      <img/>
      <div>
        <p>{prompt}</p>

        <div>
          <div>
            <div>{name[0]}</div>
            <p>{name}</p>
          </div>
          <button>
            <img/>
          </button>
        </div>
      </div>
    </div>
  )
};

export default Card