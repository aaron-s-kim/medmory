import React from "react";
import { ACTIONS } from 'context/reducer'

export default function Medgroup({ user, dispatch }) {
  return (
    <div>
      <span style={{ color: user.confirmed ? '#AAA' : '#000'}}>
        {user.nameMG}
      </span>
      <button onClick={() => dispatch({ type: ACTIONS.CONFIRM_MED_GROUP_TAKEN, payload: { id: user.id }})}>Toggle</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_MED_GROUP, payload: { id: user.id }})}>Delete</button>
    </div>
  )
}
