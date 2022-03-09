const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default player;
