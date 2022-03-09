const INITIAL_STATE = {
  ranking: [
    { name: '',
      score: 0,
      picture: '',
    },
  ],
};

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default rankingReducer;
