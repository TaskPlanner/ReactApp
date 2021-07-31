import { regSUCCESS, authSUCCESS, fetchSUCCESS } from 'actions/Inbox';
import { addSUCCESS, updateSUCCESS } from 'actions/Inbox';
import { removeSUCCESS, resetSUCCESS } from 'actions/Inbox';
import storage from 'redux-persist/lib/storage';

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
        projects: [
          {
            _id: '1',
            name: 'Task Planner',
            data: [...action.payload.data].filter(
              item => item.project == 'Task Planner'
            ),
          },
        ],
      };
    case addSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox, action.payload.data
        ],
        projects: [
          {
            _id: '1',
            name: 'Task Planner',
            data: [
              ...state.inbox, action.payload.data
            ].filter(
              item => item.project == 'Task Planner'
            ),
          },
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
        projects: [
          {
            _id: '1',
            name: 'Task Planner',
            data: [
              ...state.inbox.map(
                item => item._id === action.payload._id ?
                  action.payload.data : item
              ),
            ].filter(
              item => item.project == 'Task Planner'
            ),
          },
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
        projects: [
          {
            _id: '1',
            name: 'Task Planner',
            data: [
              ...state.inbox.filter(
                item => item._id !== action.payload._id
              ),
            ].filter(
              item => item.project == 'Task Planner'
            ),
          },
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
