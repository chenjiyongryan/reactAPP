const ADD_GUN = "add";
const REMOVE_GUN = "reduce";

//reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
      break;
    case "reduce":
      return state - 1;
      break;
    default:
      return 10;
      break;
  }
}

//action creator
function addGUN() {
  return { type: ADD_GUN };
}

function removeGUN() {
  return { type: REMOVE_GUN };
}

export { addGUN, removeGUN };
