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
} from "@chakra-ui/react";

const ImageGenerator = () => {
  const images = [
    "data:image/png;base64,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",
    "data:image/png;base64,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",
  ];
  return (
    <Box flexGrow={1}>
      <VStack align="start" gap={3}>
        <Heading size="sm">🖼 Picture Description</Heading>
        <Textarea
          value={"this is text"}
          onChange={() => {}}
          maxLength={50000}
          placeholder="Enter image prompt here..."
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
                        />
                      </Box>
                    </Box>
                  </RadioCard.ItemText>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </HStack>
        </RadioCard.Root>

        <Button variant="outline">Recreate Images</Button>
      </VStack>
    </Box>
  );
};

export default ImageGenerator;
