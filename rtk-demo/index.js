const store=require('./app/store');

const cakeActions=require('./features/cake/cakeSlice').cakeActions
const fetchUsers=require('./features/user/userSlice').fetchUsers
console.log('Initial state',store.getState());
const unsubscribe=store.subscribe(()=>{
    console.log('updated state',store.getState());
    


})
store.dispatch(fetchUsers());
store.dispatch(cakeActions.ordered());
        store.dispatch(cakeActions.ordered());
            store.dispatch(cakeActions.ordered());
unsubscribe();