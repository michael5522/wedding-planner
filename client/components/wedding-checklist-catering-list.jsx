import React from 'react';

export default function WeddingCateringList(props) {
  return (
    props.todos.map(todo => {
      return <li className="list-group-item d-flex justify-content-between" key={todo.foodId}>

        <h6>{todo.foodName}</h6>
        <h6 className="text-muted">{todo.foodCategory}</h6>
      </li>;

    })
  );
}
