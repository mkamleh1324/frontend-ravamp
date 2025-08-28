import {
  Box,
  Heading,
  Accordion,
  Span,
  Separator,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import ImageGenerator from "../image-generator/ImageGenerator";
import VideoGenerator from "../video-generator/VideoGenerator";
import VoiceOverGenerator from "../voice-over-generator/VoiceOverGenerator";
import { useSelector } from "react-redux";
import { selectState } from "@/redux/HexGeneratorSlice";

const Scenes = () => {
  const { scenes, isLoading } = useSelector(selectState);

  return (
    <Box>
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(255, 255, 255, 0.8)"
          zIndex={999}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="blue.500" />
        </Box>
      )}

      <Heading size="sm" mb={4} bg={"white"} p={10} borderRadius={10}>
        Generated Scenes ({scenes.length} scenes detected)
      </Heading>

      <Accordion.Root collapsible>
        {scenes.map((item, index) => (
          <Box
            marginBottom={10}
            borderRadius={10}
            bg={"white"}
            paddingRight={10}
          >
            <Accordion.Item key={index} value={item.scene} h={"fit-content"}>
              <Accordion.ItemTrigger>
                <Span flex="1" padding={10}>
                  Scene {index + 1}
                </Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Separator />

                <Flex gap="4" w={"100%"} padding={10}>
                  <VoiceOverGenerator voiceover={item.dialog} />
                  <ImageGenerator
                    images={item.images}
                    initialImagePrompt={item.imagePrompt}
                    sceneIndex={index}
                    isLoading={!!item.isImageLoading}
                  />
                  <VideoGenerator
                    initialAnimationPrompt={item.animationPrompt}
                    sceneIndex={index}
                    videoLink={item.videoLink}
                    isLoading={!!item.isVideoLoading}
                  />
                </Flex>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Box>
        ))}
      </Accordion.Root>
    </Box>
  );
};

export default Scenes;
