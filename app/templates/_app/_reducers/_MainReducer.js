const initialState = {
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    /*case 'ROOM_LOADED':
      return Object.assign({}, state, {
          advisor: action.advisor,
          transcurred: action.time.transcurred,
          duration: action.time.duration
      });
    case 'SET_INITIATOR':
      return Object.assign({}, state, {
          initiator: action.initiator,
      });
    case 'CAM_REQUEST':
      return Object.assign({}, state, {
          camRequested: action.camRequested,
      });*/
    default:
      return state;
  }
}

export default MainReducer;
