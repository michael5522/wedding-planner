import React from 'react';

export default function GuestList(props) {
  return (
    props.gList.map(list => {
      return <li className="list-group-item" key={list.guestId}>
        <h6 className="d-flex justify-content-between">{list.guestFirstName} {list.guestLastName}, {list.guestRelationship}<button className="btn btn-outline-light" onClick={() => props.delete(list)}><i className="far fa-trash-alt text-muted pe-2"/></button></h6>
        <h6 className="text-muted font-italic">{list.guestEmail}</h6>
      </li>;

    })
  );
}
