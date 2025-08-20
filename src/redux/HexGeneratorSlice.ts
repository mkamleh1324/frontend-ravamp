import {
  imageGenerator,
  scenesGenerator,
  videoGenerator,
} from "@/apis/generation/generation.apis";
import { IGetScenes } from "@/apis/generation/interface";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  IFetchImagesThunk,
  IFetchScenes,
  IFetchVideoThunk,
  IScene,
  IState,
} from "./interface";

export const fetchScenes = createAsyncThunk<IFetchScenes, IGetScenes>(
  "scenes/fetch",
  async ({ imagesPerScene, textModel, prompt, imageModel }, thunkAPI) => {
    try {
      const response = await scenesGenerator({
        imagesPerScene,
        textModel,
        imageModel,
        prompt,
      });

      return { scenes: response, imageModel, imagesPerScene };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const fetchImages = createAsyncThunk<IScene[], IFetchImagesThunk>(
  "images/fetch",
  async ({ prompt, sceneIndex }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;

    const {
      scenes: existingScenes,
      imagesPerScene,
      imageModel,
    } = state.generator;
    try {
      const response = await imageGenerator({
        imagesPerScene,
        imageModel,
        prompt,
      });

      const updatedScenes = existingScenes.map((scene, index) => {
        if (index === sceneIndex) {
          return {
            ...scene,
            images: response,
            imagePrompt: prompt,
          };
        }
        return scene;
      });

      return updatedScenes;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const fetchVideo = createAsyncThunk<IScene[], IFetchVideoThunk>(
  "video/fetch",
  async ({ prompt, sceneIndex, videoModel }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;

    const { scenes: existingScenes, selectedImagesPerScene } = state.generator;
    const selectedImageIndex = selectedImagesPerScene[sceneIndex] ?? 0;
    const imageLink = existingScenes[sceneIndex].images[selectedImageIndex];
    try {
      const response = await videoGenerator({
        imageLink,
        videoModel,
        prompt,
      });

      const updatedScenes = existingScenes.map((scene, index) => {
        if (index === sceneIndex) {
          return {
            ...scene,
            videoLink: response,
            imagePrompt: prompt,
          };
        }
        return scene;
      });

      return updatedScenes;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

const initialState: IState = {
  scenes: [],
  isLoading: false,
  error: null,
  imageModel: "",
  imagesPerScene: 1,
  selectedImagesPerScene: {},
};

const generatorSlice = createSlice({
  name: "myData",
  initialState,
  reducers: {
    setSelectedImagePerScene: (
      state,
      action: PayloadAction<{ sceneIndex: number; selectedIndex: number }>
    ) => {
      const { sceneIndex, selectedIndex } = action.payload;
      state.selectedImagesPerScene[sceneIndex] = selectedIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScenes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchScenes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scenes = action.payload.scenes;
        state.imageModel = action.payload.imageModel;
        state.imagesPerScene = action.payload.imagesPerScene;
      })
      .addCase(fetchScenes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scenes = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setSelectedImagePerScene } = generatorSlice.actions;

export const selectState = (state: RootState) => state.generator;

export default generatorSlice.reducer;
