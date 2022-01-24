import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  UPDATE_DATE,
} from '@/redux/types';

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}

export default function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action) };
    }
    case CHANGE_TEXT: {
      const field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    }
    case APPLY_STYLE: {
      const field = 'stylesState';
      const val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    }
    case CHANGE_STYLES: {
      return { ...state, currentStyles: action.data };
    }
    case CHANGE_TITLE: {
      return { ...state, title: action.data };
    }
    case UPDATE_DATE: {
      return { ...state, openedDate: new Date().toJSON() };
    }
    default:
      return state;
  }
}
