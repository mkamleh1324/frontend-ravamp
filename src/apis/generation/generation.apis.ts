import request from "@/config/request";
import {
  IGetImages,
  IGetImagesResponse,
  IGetScenes,
  IGetVideo,
  IGetVideoResponse,
} from "./interface";
import { IScene } from "@/redux/interface";
import { generateScenesMock } from "./mocks";

export const scenesGenerator = async ({
  textModel,
  imageModel,
  imagesPerScene,
  prompt,
}: IGetScenes): Promise<IScene[]> => {
  //   const scenes = await request<IScene[]>({
  //     method: "POST",
  //     body: { textModel, imagesPerScene, imageModel, prompt },
  //     url: "text/",
  //   });

  return Promise.resolve(generateScenesMock);

  //   return scenes;
};

export const imageGenerator = async ({
  imageModel,
  imagesPerScene,
  prompt,
}: IGetImages): Promise<string[]> => {
  const res = await request<IGetImagesResponse>({
    method: "POST",
    body: { imagesPerScene, imageModel, prompt },
    url: "images/",
  });

  return res.images;
};

export const videoGenerator = async ({
  imageLink,
  videoModel,
  prompt,
}: IGetVideo): Promise<string> => {
  const res = await request<IGetVideoResponse>({
    method: "POST",
    body: { imageLink, videoModel, prompt },
    url: "videos/",
  });

  return res.videoLink;
};
