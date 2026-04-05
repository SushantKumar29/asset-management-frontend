jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

import { store, RootState, AppDispatch, AppStore } from "@/app/store";

describe("Redux Store", () => {
  it("should create store with correct structure", () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  it("should have all expected reducers", () => {
    const state = store.getState();

    const expectedReducers = [
      "auth",
      "dashboard",
      "assets",
      "analytics",
      "reports",
      "tags",
      "usage",
      "jobs",
    ];

    expectedReducers.forEach((reducer) => {
      expect(state).toHaveProperty(reducer);
    });
  });

  it("should have correct number of reducers", () => {
    const state = store.getState();
    expect(Object.keys(state)).toHaveLength(8);
  });

  it("should return initial state for all reducers", () => {
    const state = store.getState();

    Object.values(state).forEach((reducerState) => {
      expect(reducerState).toBeDefined();
    });
  });

  it("should dispatch actions", () => {
    const testAction = { type: "TEST_ACTION", payload: "test" };
    const result = store.dispatch(testAction);
    expect(result).toEqual(testAction);
  });

  it("should have correct RootState type", () => {
    const state: RootState = store.getState();
    expect(typeof state).toBe("object");
  });

  it("should have correct AppDispatch type", () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(typeof dispatch).toBe("function");
  });

  it("should have correct AppStore type", () => {
    const appStore: AppStore = store;
    expect(appStore).toBeDefined();
  });

  it("should allow subscribing to store changes", () => {
    let called = false;
    const unsubscribe = store.subscribe(() => {
      called = true;
    });

    store.dispatch({ type: "TEST" });
    expect(called).toBe(true);

    unsubscribe();
  });
});
