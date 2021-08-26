import { REG, AUTH, RESET, FETCH } from 'actions';
import { ADD, UPDATE, REMOVE } from 'actions';
import { proFETCH, proADD } from 'actions/projects';
import { proUPDATE, proREMOVE } from 'actions/projects';
import storage from 'redux-persist/lib/storage';

const reducer = (state, action) => {
  switch (action.type) {
    case REG:
      return { ...state, registered: true };
    case AUTH:
      return { ...state, user: action.payload.data._id };
    case FETCH:
      return {
        ...state,
        inbox: [...action.payload.data],
        planner: [...new Set([...action.payload.data].map(
          i => i.date))].sort().map((i) => ({
            _id: i, title: i,
            data: [...action.payload.data].filter(item => item.date == i),
          })),
      };
    case proFETCH:
      return {
        ...state,
        projects: [...action.payload.data].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox].filter(item => item.project == i.title),
        })),
      };
    case ADD:
      [...state.inbox].map(i => i.position++);
      return {
        ...state,
        inbox: [...state.inbox, action.payload.data],
        planner: [...new Set([...state.inbox, action.payload.data].map(
          i => i.date))].sort().map((i) => ({
            _id: i, title: i,
            data: [...state.inbox, action.payload.data].filter(item => item.date == i),
          })),
        projects: [...state.projects].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox, action.payload.data].filter(item => item.project == i.title)
        })),
      };
    case proADD:
      [...state.projects].map(i => i.position++);
      return {
        ...state,
        projects: [...state.projects, action.payload.data].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox].filter(item => item.project == i.title)
        })),
      };
    case UPDATE:
      return {
        ...state,
        inbox: [...state.inbox.map(
          item => item._id === action.payload._id ? action.payload.data : item
        )],
        planner: [...new Set([...state.inbox.map(
          item => item._id === action.payload._id ? action.payload.data : item
        )].map(i => i.date))].sort().map((i) => ({
          _id: i, title: i,
          data: [...state.inbox.map(
            item => item._id === action.payload._id ? action.payload.data : item
          )].filter(item => item.date == i),
        })),
        projects: [...state.projects].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox.map(
            item => item._id === action.payload._id ? action.payload.data : item
          )].filter(item => item.project == i.title)
        })),
      };
    case proUPDATE:
      const updatePro = [...state.projects].find(item => item._id == action.payload._id);
      const updateName = updatePro && updatePro.title;
      return {
        ...state,
        inbox: [...state.inbox.map(item => item.project === updateName ?
          { ...item, project: action.payload.data.title } : item
        )],
        planner: [...new Set([...state.inbox.map(item => item.project === updateName ?
          { ...item, project: action.payload.data.title } : item
        )].map(i => i.date))].sort().map((i) => ({
          _id: i, title: i,
          data: [...state.inbox.map(item => item.project === updateName ?
            { ...item, project: action.payload.data.title } : item
          )].filter(item => item.date == i),
        })),
        projects: [...state.projects.map(
          item => item._id === action.payload._id ? action.payload.data : item
        )].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox].filter(item => item.project == i.title)
        })),
      };
    case REMOVE:
      return {
        ...state,
        inbox: [...state.inbox.filter(item => item._id !== action.payload._id)],
        planner: [...new Set([...state.inbox.filter(item => item._id !== action.payload._id
        )].map(i => i.date))].sort().map((i) => ({
          _id: i, title: i,
          data: [...state.inbox.filter(item => item._id !== action.payload._id
          )].filter(item => item.date == i),
        })),
        projects: [...state.projects].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox.filter(item => item._id !== action.payload._id
          )].filter(item => item.project == i.title)
        })),
      };
    case proREMOVE:
      const removePro = [...state.projects].find(item => item._id == action.payload._id);
      const removeName = removePro && removePro.title;
      return {
        ...state,
        inbox: [...state.inbox.map(
          item => item.project === removeName ? { ...item, project: null } : item
        )],
        planner: [...new Set([...state.inbox.map(
          item => item.project === removeName ? { ...item, project: null } : item
        )].map(i => i.date))].sort().map((i) => ({
          _id: i, title: i,
          data: [...state.inbox.map(
            item => item.project === removeName ? { ...item, project: null } : item
          )].filter(item => item.date == i),
        })),
        projects: [...state.projects.filter(
          item => item._id !== action.payload._id
        )].map((i) => ({
          _id: i._id, title: i.title, position: i.position,
          data: [...state.inbox].filter(item => item.project == i.title)
        })),
      };
    case RESET:
      storage.removeItem('persist:root'); return {};
    default:
      return state;
  }
};

export default reducer;
