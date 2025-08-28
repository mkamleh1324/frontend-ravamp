import {
  fetchImages,
  setSelectedImagePerScene,
} from "@/redux/HexGeneratorSlice";
import { AppDispatch } from "@/redux/store";
import {
  Box,
  VStack,
  Heading,
  Textarea,
  RadioCard,
  HStack,
  Button,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

const ImageGenerator = ({
  images,
  initialImagePrompt,
  sceneIndex,
  isLoading,
}: {
  images: string[];
  initialImagePrompt: string;
  sceneIndex: number;
  isLoading: boolean;
}) => {
  const [imagePrompt, setImagePrompt] = useState(initialImagePrompt);

  const dispatch = useDispatch<AppDispatch>();

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event);
    setImagePrompt(event.target.value);
  };

  const handleOnImgClick = (selectedIndex: number) => {
    dispatch(
      setSelectedImagePerScene({
        sceneIndex,
        selectedIndex,
      })
    );
  };

  const regenerateImage = () => {
    dispatch(fetchImages({ sceneIndex, prompt: imagePrompt }));
  };

  return (
    <Box flexGrow={1}>
      <VStack align="start" gap={3}>
        <Heading size="sm">🖼 Picture Description</Heading>
        <Textarea
          value={imagePrompt}
          onChange={handlePromptChange}
          maxLength={50000}
          placeholder={imagePrompt}
          height="120px"
        />
        <Text fontSize="sm" color="gray.500">
          {500}/{100000} characters
        </Text>

        <Text fontWeight="bold">Generated Images</Text>

        <RadioCard.Root
          defaultValue="0"
          variant={"solid"}
          orientation="vertical"
          align="center"
        >
          <RadioCard.Label>Select image</RadioCard.Label>
          <HStack>
            {images.map((item, index) => (
              <RadioCard.Item key={index} value={index.toString()}>
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemText>
                    <Box as="label" pointerEvents="none">
                      <Box
                        cursor="pointer"
                        position={"relative"}
                        borderWidth="2px"
                        borderRadius="md"
                        overflow="hidden"
                        _checked={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 2px #3182ce",
                        }}
                      >
                        <Image
                          src={item}
                          alt="Generated"
                          boxSize="150px"
                          objectFit="cover"
                          onClick={() => handleOnImgClick(index)}
                        />
                      </Box>
                    </Box>
                  </RadioCard.ItemText>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </HStack>
        </RadioCard.Root>

        <Button
          variant="outline"
          onClick={regenerateImage}
          disabled={isLoading}
        >
          {isLoading && <Spinner size="lg" color="blue.500" />}
          Recreate Images
        </Button>
      </VStack>
    </Box>
  );
};

export default ImageGenerator;
