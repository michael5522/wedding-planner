import React from 'react';

export default function WeddingCateringList(props) {
  // console.log(props.todos);
  return (
    props.todos.map(todo => {
      return <li className="list-group-item d-flex justify-content-between" key={todo.checkListId}>

        <h6>{todo.checkListCategory}</h6>
        <h6 className="text-muted">{todo.checkListToDo}</h6>
      </li>;

    })
  );
}
