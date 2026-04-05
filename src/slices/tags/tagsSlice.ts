import { createSlice } from "@reduxjs/toolkit";
import { fetchAssetTags } from "./thunks";

interface TagsState {
  tags: Array<{ id: string; name: string }> | null;
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  tags: null,
  loading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchAssetTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = tagsSlice.actions;
export default tagsSlice.reducer;
