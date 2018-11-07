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
function addGun() {
  return { type: ADD_GUN };
}

function removeGun() {
  return { type: REMOVE_GUN };
}
function addGunAsync() {
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGun())
    },3000)
  }
}

export { addGun, removeGun ,addGunAsync};
