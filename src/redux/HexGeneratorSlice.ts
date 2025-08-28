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

export const fetchImages = createAsyncThunk<string[], IFetchImagesThunk>(
  "images/fetch",
  async ({ prompt }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;

    const { imagesPerScene, imageModel } = state.generator;
    try {
      const images = await imageGenerator({
        imagesPerScene,
        imageModel,
        prompt,
      });

      return images;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const fetchVideo = createAsyncThunk<string, IFetchVideoThunk>(
  "video/fetch",
  async ({ prompt, sceneIndex, videoModel }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;

    const { scenes: existingScenes, selectedImagesPerScene } = state.generator;
    const selectedImageIndex = selectedImagesPerScene[sceneIndex] ?? 0;
    const imageLink = existingScenes[sceneIndex].images[selectedImageIndex];
    try {
      const videoLink = await videoGenerator({
        imageLink,
        videoModel,
        prompt,
      });

      return videoLink;
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
    setVideoIsLoading: (state, action) => {
      state.scenes[action.payload].isVideoLoading = true;
    },
    setImageIsLoading: (state, action) => {
      state.scenes[action.payload].isVideoLoading = true;
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
      .addCase(fetchImages.pending, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.error = null;
        state.scenes[sceneIndex].isImageLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.scenes[sceneIndex].images = action.payload;
        state.scenes[sceneIndex].isImageLoading = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.scenes[sceneIndex].isImageLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchVideo.pending, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.error = null;
        state.scenes[sceneIndex].isVideoLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.scenes[sceneIndex].videoLink = action.payload;
        state.scenes[sceneIndex].isVideoLoading = false;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        const { sceneIndex } = action.meta.arg;
        state.scenes[sceneIndex].isVideoLoading = false;

        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setSelectedImagePerScene } = generatorSlice.actions;

export const selectState = (state: RootState) => state.generator;

export default generatorSlice.reducer;
