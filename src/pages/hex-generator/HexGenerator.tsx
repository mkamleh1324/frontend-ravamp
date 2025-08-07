import { Box, Heading } from "@chakra-ui/react";

import ScriptGenerator from "./components/script-generator/ScriptGenerator";
import Scenes from "./components/scenes/Scenes";

const HexGenerator = () => {
  return (
    <Box p={6} h={"fit-content"} bg={"gray.100"}>
      <Heading size="lg" mb={6}>
        AI Video Generation Platform
      </Heading>

      <ScriptGenerator />
      <Scenes />
    </Box>
  );
};

export default HexGenerator;
