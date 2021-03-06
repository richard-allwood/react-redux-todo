import { types } from '../actions';
import store from 'store';

const items = store.get('items') || [
  {
    id: '1bf3f3b0-92f7-11e8-8ac4-7df8b01f91bd',
    title: 'Write some code',
    completed: true
  },
  {
    id: '209b34a0-92f7-11e8-8ac4-7df8b01f91bd',
    title: 'Add in redux-saga',
    completed: true
  },
  {
    id: '1bf3f3b0-92f9-11e8-96fb-03ee9f402465',
    title: 'Add reselect into the application',
    completed: true
  },
  {
    id: '357c9830-92f9-11e8-96fb-03ee9f402465',
    title: 'Add tests',
    completed: false
  },
  {
    id: '3915af60-92f7-11e8-8ac4-7df8b01f91bd',
    title: 'Try redux-observable',
    completed: false
  }
];

const initialState = {
  quote: '',
  edit: '',
  visible: true,
  items,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.EDIT:
      return { ...state, edit: payload.text };
    case types.ADD:
      return {
        ...state,
        edit: '',
        items: [
          ...state.items,
          {
            id: payload.id,
            title: payload.text,
            completed: false,
          }
        ]};
    case types.TOGGLE_VISIBLE:
      return { ...state, visible: !state.visible };
    case types.TOGGLE_ITEM:
      return { ...state, items: state.items.map(item => item.id === payload.id
        ? { ...item, completed: !item.completed }
        : item)};
    case types.EDIT_ITEM:
      return { ...state, items: state.items.map(item => item.id === payload.id
        ? { ...item, editing: true, editText: payload.text === undefined ? item.title : payload.text }
        : item)};
    case types.UPDATE_ITEM:
      return { ...state, items: state.items.map(item => item.id === payload.id
        ? { ...item, editing: false, title: payload.text }
        : item)};
    case types.UPDATE_ITEM_ICON:
      return { ...state, items: state.items.map(item => item.id === payload.id
        ? { ...item, icon: payload.icon }
        : item)}
    case types.REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== payload.id) };
    case types.CLEAR_COMPLETED:
      return { ...state, items: state.items.filter(item => !item.completed) };
    case types.DRAG_END: {
      const { source, destination } = payload.result;
      const indexOf = id => state.items
        .map(item => item.id)
        .indexOf(id);

      const items = Array.from(state.items);
      const [removed] = items.splice(indexOf(source), 1);
      items.splice(indexOf(destination), 0, removed);

      return { ...state, items };
    }
    default:
      return state;
  }
};

export default {
  todo: reducer,
};
