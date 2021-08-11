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
        inbox: [
          ...action.payload.data
        ],
        planner: [...new Set([
          ...action.payload.data
        ].map(i => i.date))].map((i) => ({
          _id: i, name: i,
          data: [
            ...action.payload.data
          ].filter(item => item.date == i),
        })),
        projects: [...new Set([
          ...action.payload.data
        ].map(i => i.project))].map((i) => ({
          _id: i, name: i, data: [
            ...action.payload.data
          ].filter(item => item.project == i),
        })),
      };
    case addSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox, action.payload.data
        ],
        planner: [...new Set([
          ...state.inbox, action.payload.data
        ].map(i => i.date))].map((i) => ({
          _id: i, name: i,
          data: [
            ...state.inbox, action.payload.data
          ].filter(item => item.date == i),
        })),
        projects: [...new Set([
          ...state.inbox, action.payload.data
        ].map(i => i.project))].map((i) => ({
          _id: i, name: i, data: [
            ...state.inbox, action.payload.data
          ].filter(item => item.project == i),
        })),
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
        planner: [...new Set([
          ...state.inbox.map(
            item => item._id === action.payload._id ?
              action.payload.data : item
          ),
        ].map(i => i.date))].map((i) => ({
          _id: i, name: i,
          data: [
            ...state.inbox.map(
              item => item._id === action.payload._id ?
                action.payload.data : item
            ),
          ].filter(item => item.date == i),
        })),
        projects: [...new Set([
          ...state.inbox.map(
            item => item._id === action.payload._id ?
              action.payload.data : item
          ),
        ].map(i => i.project))].map((i) => ({
          _id: i, name: i, data: [
            ...state.inbox.map(
              item => item._id === action.payload._id ?
                action.payload.data : item
            ),
          ].filter(item => item.project == i),
        })),
      };
    case removeSUCCESS:
      return {
        ...state,
        inbox: [
          ...state.inbox.filter(
            item => item._id !== action.payload._id
          ),
        ],
        planner: [...new Set([
          ...state.inbox.filter(
            item => item._id !== action.payload._id
          ),
        ].map(i => i.date))].map((i) => ({
          _id: i, name: i,
          data: [
            ...state.inbox.filter(
              item => item._id !== action.payload._id
            ),
          ].filter(item => item.date == i),
        })),
        projects: [...new Set([
          ...state.inbox.filter(
            item => item._id !== action.payload._id
          ),
        ].map(i => i.project))].map((i) => ({
          _id: i, name: i, data: [
            ...state.inbox.filter(
              item => item._id !== action.payload._id
            ),
          ].filter(item => item.project == i),
        })),
      };
    case resetSUCCESS:
      storage.removeItem('persist:root');
      return {};
    default:
      return state;
  }
};

export default reducer;
