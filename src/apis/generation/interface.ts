import { TImageModel, TTextModel } from "@/types/models";
import { IGetAllRequest } from "../interface";

export interface IProduct {
  id: number;
  productId: number;
  price: string;
  location: string;
  title: string;
  description: string;
}

export interface IGetProductById {
  productId: number;
}

export interface IGetAllProductsRequest extends IGetAllRequest {}

export interface IGetScenes {
  textModel: string;
  imageModel: string;
  imagesPerScene: number;
  prompt: string;
}

export interface IGetImages {
  imageModel: string;
  imagesPerScene: number;
  prompt: string;
}

export interface IGetVideo {
  imageLink: string;
  videoModel: string;
  prompt: string;
}

export interface IGetVideoResponse {
  videoLink: string;
}

export interface IGetImagesResponse {
  images: string[];
}
