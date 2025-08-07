import { Box, VStack, Heading, Textarea, Text } from "@chakra-ui/react";

const VoiceOverGenerator = () => {
  return (
    <Box flexGrow={1}>
      <VStack align="start" gap={3}>
        <Heading size="sm">🎙 Voice Over Script</Heading>
        <Textarea
          placeholder="Type your script here..."
          value={"hiiiii"}
          onChange={() => {}}
          maxLength={5000}
          resize="vertical"
          height="120px"
        />
        <Text fontSize="sm" color="gray.500">
          {50}/{50000} characters
        </Text>
      </VStack>
    </Box>
  );
};

export default VoiceOverGenerator;
