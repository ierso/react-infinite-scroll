import React from 'react';

export default function(props) {
  return (
    <div key={props.id} className='message'>
      <div className="message__img">
        <img src={props.image} alt={props.name}/>
      </div>
      <div className="message__info">
        <h4 className="message__name">{props.name}</h4>
        <p className="message__content">{props.content}</p>
      </div>
    </div>
  )
}
