import { Box, Heading } from "@chakra-ui/react";

import Scenes from "./components/scenes/Scenes";
import SceneGenerator from "./components/scene-generator/SceneGenerator";

const HexGenerator = () => {
  return (
    <Box p={6} h={"fit-content"} bg={"gray.100"}>
      <Heading size="lg" mb={6}>
        AI Video Generation Platform
      </Heading>

      <SceneGenerator />
      <Scenes />
    </Box>
  );
};

export default HexGenerator;
