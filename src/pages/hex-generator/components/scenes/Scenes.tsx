import {
  Box,
  Heading,
  Accordion,
  Span,
  Separator,
  Flex,
} from "@chakra-ui/react";
import ImageGenerator from "../image-generator/ImageGenerator";
import VideoGenerator from "../video-generator/VideoGenerator";
import VoiceOverGenerator from "../voice-over-generator/VoiceOverGenerator";

const Scenes = () => {
  const scenes = [
    { id: 1, status: "complete" },
    { id: 2, status: "processing" },
    { id: 3, status: "pending" },
  ];
  return (
    <Box>
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
            <Accordion.Item key={index} value={item.status} h={"fit-content"}>
              <Accordion.ItemTrigger>
                <Span flex="1" padding={10}>
                  Scene {index + 1}
                </Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Separator />

                <Flex gap="4" w={"100%"} padding={10}>
                  <VoiceOverGenerator />
                  <ImageGenerator />
                  <VideoGenerator />
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
