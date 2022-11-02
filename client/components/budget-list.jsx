import React from 'react';

export default function TodoList(props) {
  // console.log(props.todos);
  return (
    props.todos.map(todo => {
      return <li className="list-group-item d-flex justify-content-between" key={todo.itemId}>
        <h6>{todo.item}</h6>
        <h6 className="text-muted">{todo.cost}</h6>
      </li>;

    })
  );
}
