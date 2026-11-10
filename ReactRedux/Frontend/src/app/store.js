const configureStore=require('@reduxjs/toolkit').configureStore;
const cakeReducer=require('../features/cake/cakeSlice');
const userReducers=require('../features/user/userSlice');
const logger=ReduxLogger.createLogger();
const store=configureStore({
    reducer:{
        cake:cakeReducer,
        user:userReducers,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
})
module.exports=store;