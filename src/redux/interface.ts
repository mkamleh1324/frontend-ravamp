export interface IScene {
  id: string;
  scene: string;
  duration: number;
  character: string;
  context: string;
  imagePrompt: string;
  animationPrompt: string;
  dialog: string;
  images: string[];
  selectedImage?: number;
  videoLink?: string;
}

export interface IState {
  scenes: IScene[];
  isLoading: boolean;
  error: string | null;
  imageModel: string;
  imagesPerScene: number;
  selectedImagesPerScene: Record<number, number>;
}

export interface IFetchImagesThunk {
  sceneIndex: number;
  prompt: string;
}

export interface IFetchVideoThunk extends IFetchImagesThunk {
  videoModel: string;
}

export interface IFetchImagesThunkReturn {
  sceneIndex: number;
  images: string[];
  prompt: string;
}

export interface IFetchScenes {
  scenes: IScene[];
  imageModel: string;
  imagesPerScene: number;
}
