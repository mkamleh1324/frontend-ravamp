import { createListCollection } from "@chakra-ui/react";

export const textModels = createListCollection({
  items: [
    { label: "gpt", value: "gpt" },
    { label: "gemini", value: "gemini" },
    { label: "deepseek", value: "deepseek" },
  ],
});

export const imageModels = createListCollection({
  items: [
    { label: "gpt", value: "gpt" },
    { label: "gemini", value: "gemini" },
  ],
});

export const imagesPerScene = createListCollection({
  items: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
  ],
});
