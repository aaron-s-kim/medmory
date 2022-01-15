import React, { useState, useContext } from "react";

// Initial state and actions
export const initialState = {
  medGroupList: ['test-medGroup']
}

export const ACTIONS = {
  ADD_MED_GROUP: 'add-med-group',
  DELETE_MED_GROUP: 'delete-med-group',
  CONFIRM_MED_GROUP_TAKEN: 'confirm-med-group-taken'
}

// Reducer to handle actions
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_MED_GROUP:
      return {
        medGroupList: [
          ...state.medGroupList,
          {
            id: new Date().valueOf(),
            name: action.medGroupName,
            confirmed: false
          }
        ]
      };
    case ACTIONS.DELETE_MED_GROUP:
      const filteredList = state.medGroupList.filter(mgItem => mgItem.id !== action.medGroupId);
      return { medGroupList: filteredList };
    case ACTIONS.CONFIRM_MED_GROUP_TAKEN:
      const confirmedList = state.medGroupList.map(mgItem =>
        mgItem.id === action.mgItemId
          ? { ...mgItem, confirmed: !mgItem.confirmed }
          : mgItem
        );
      return { medGroupList: confirmedList };
  default:
    return state
  }
};


// Context and Provider
export const UserInfoContext = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    medGroupList: state.medGroupList,
    addMedGroupItem: (medGroupName) => {
      dispatch({ type: ACTIONS.ADD_TODO_ITEM, medGroupName });
    },
    deleteMedGroupItem: (medGroupId) => {
      dispatch({ type: ACTIONS.DELETE_TODO_ITEM, medGroupId });
    },
    confirmAsTaken: (medGroupId) => {
      dispatch({ type: ACTIONS.CONFIRM_MED_GROUP_TAKEN, medGroupId });
    }
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};



export const AddMedgroup = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { addMedGroupItem } = React.useContext(UserInfoContext);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        placeholder={"Type and add medgroup item"}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          addMedGroupItem(inputValue);
          setInputValue("");
        }}
      >
        Add
      </button>
    </>
  );
};


export const MedGroupList = () => {
  const { medGroupList, deleteMedGroupItem, confirmAsTaken } = React.useContext(UserInfoContext);
  return (
    <ul>
      {medGroupList.map((mgItem) => (
        <li
          className={`mgItem ${mgItem.confirmed ? "confirmed" : ""}`}
          key={mgItem.id}
          onClick={() => confirmAsTaken(mgItem.id)}
        >
          {mgItem.name}
          <button
            className="delete"
            onClick={() => deleteMedGroupItem(mgItem.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};