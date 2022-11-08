import React from 'react';

export default function GuestList(props) {
  // console.log(props.gList);
  return (
    props.gList.map(list => {
      return <li className="list-group-item" key={list.guestId}>

        <h6>{list.guestFirstName} {list.guestLastName}, {list.guestRelationship}</h6>
        <h6 className="text-muted font-italic">{list.guestEmail}</h6>
      </li>;

    })
  );
}
