import DropDownMenu from "@/components/ui/dropdown-menu/DropDownMenu";
import {
  Box,
  HStack,
  Heading,
  Textarea,
  Button,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";

const ScriptGenerator = () => {
  const [script, setScript] = useState("");

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={8} bg={"white"}>
      <HStack marginBottom={20}>
        <Heading size="sm" mb={3} w={"50%"}>
          Global Script Input
        </Heading>
        <HStack w={"50%"} justifyContent={"end"}>
          <DropDownMenu items={frameworks} title={"AI Model"} />
          <DropDownMenu items={frameworks} title={"Picture Count"} />
          <DropDownMenu items={frameworks} title={"Picture Model"} />
        </HStack>
      </HStack>

      <Textarea
        placeholder="Enter your complete script..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
        maxLength={2000}
        h={250}
      />
      <Text fontSize="sm" color="gray.500" textAlign="right">
        {script.length}/2000 characters
      </Text>
      <Button mt={4} colorScheme="blue">
        Auto-detect Scenes
      </Button>
    </Box>
  );
};

export default ScriptGenerator;
