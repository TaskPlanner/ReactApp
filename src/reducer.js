import { regSUCCESS, authSUCCESS, fetchSUCCESS } from 'actions';
import { addSUCCESS, updateSUCCESS } from 'actions';
import { removeSUCCESS, resetSUCCESS } from 'actions';
import storage from 'redux-persist/lib/storage';
import { inbox } from 'data/inbox';

const initial = {
  inbox,
  planner: [
    {
      _id: '1',
      name: '10.03.2021',
      data: inbox.filter(
        (item) => ['1', '2'].includes(item._id)),
    },
    {
      _id: '2',
      name: '11.03.2021',
      data: inbox.filter(
        (item) => ['3', '4', '5'].includes(item._id)),
    },
  ],
  projects: [
    {
      _id: '1',
      name: 'Example Project',
      data: inbox.filter(
        (item) => ['1', '2'].includes(item._id)),
    },
    {
      _id: '2',
      name: 'Example Project',
      data: inbox.filter(
        (item) => ['3', '4'].includes(item._id)),
    },
    {
      _id: '3',
      name: 'Example Project',
      data: inbox.filter(
        (item) => ['5', '6'].includes(item._id)),
    },
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case regSUCCESS:
      return {
        ...state,
        registered: true,
      };
    case authSUCCESS:
      return {
        ...state,
        user: action.payload.data._id,
      };
    case fetchSUCCESS:
      return {
        ...state,
        inbox: [...action.payload.data],
      };
    case addSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox, action.payload.data
        ],
      };
    case updateSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox.map(
            item => item._id === action.payload._id ?
              action.payload.data : item
          ),
        ],
      };
    case removeSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox.filter(
            item => item._id !== action.payload._id
          ),
        ],
      };
    case resetSUCCESS:
      storage.removeItem('persist:root');
      return {};
    default:
      return state;
  }
};

export default reducer;
