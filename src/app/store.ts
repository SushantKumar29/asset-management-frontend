import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/auth/authSlice";
import dashboardReducer from "@/slices/dashboard/dashboardSlice";
import assetsReducer from "@/slices/assets/assetsSlice";
import analyticsReducer from "@/slices/analytics/analyticsSlice";
import reportsReducer from "@/slices/reports/reportsSlice";
import tagsReducer from "@/slices/tags/tagsSlice";
import usageReducer from "@/slices/usage/usageSlice";
import jobsReducer from "@/slices/jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    assets: assetsReducer,
    analytics: analyticsReducer,
    reports: reportsReducer,
    tags: tagsReducer,
    usage: usageReducer,
    jobs: jobsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
