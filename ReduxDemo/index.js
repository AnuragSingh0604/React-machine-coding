const redux=require("redux");
const reduxLogger=require("redux-logger");
const createStore=redux.createStore;
const bindActionCreators=redux.bindActionCreators;
const combineReducers=redux.combineReducers;
const applyMiddleware=redux.applyMiddleware;
const BUY_CAKE='BUY_CAKE';
const CAKE_RESTOCKED='CAKE_RESTOCKED';
const logger=reduxLogger.createLogger();
function buyCake(){
    return {
        type:BUY_CAKE,
        info:"First redux action"
    }
}
function restockCake(qty=1){
    return {
        type:CAKE_RESTOCKED,
        quantity:qty,
    }
}
const intialState={
    numOfCakes:10
}
const reducer=(state=intialState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        case CAKE_RESTOCKED: return{
            ...state,
            numOfCakes:state.numOfCakes+action.quantity,
        }
        default:return state
    }
}
const store=createStore(reducer,applyMiddleware(logger));
console.log("Initial state",store.getState());

const unsubscribe=store.subscribe(()=>"");
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(restockCake(3));
// const actions=bindActionCreators({orderCake,restockCake},store.dispatch);
// actions.orderCake();
// actions.orderCake();
// actions.orderCake();
// actions.restockCake(3);
unsubscribe();
// const rootReducer=combineReducers(
//     {
//         cake:cakeReducer,
//         iceCream:iceCreamReducer,
//     }
// )