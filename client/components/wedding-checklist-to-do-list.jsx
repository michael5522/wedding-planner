import React from 'react';

export default function TodoListWeddingCheckList(props) {
  // console.log(props.todos);
  return (
    props.todos.map(todo => {
      return <li className="list-group-item" key={todo.checkListId}>
        <h6 className="d-flex justify-content-between">{todo.checkListToDo}<button className="btn btn-outline-light" onClick={() => props.delete(todo)}><i className="far fa-trash-alt text-muted pe-2" /></button></h6>
        <h6 className="text-muted font-italic">{todo.checkListCategory}</h6>
      </li>;

    })
  );
}
