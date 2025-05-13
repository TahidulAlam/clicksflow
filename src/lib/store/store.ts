import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../../features/admin/adminSlice';
import partnerReducer from '../../features/partner/partnerSlice';
import advertiserReducer from '../../features/advertiser/advertiserSlice';
export const makeStore = () => configureStore({reducer:{
    adminDashboard: adminReducer,
    partnerDashboard: partnerReducer,
    advertiserDashboard: advertiserReducer,
}})
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];