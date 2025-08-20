import DropDownMenu from "@/components/ui/dropdown-menu/DropDownMenu";
import { Box, HStack, Heading, Textarea, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { imagesPerScene, imageModels, textModels } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchScenes, selectState } from "@/redux/HexGeneratorSlice";
import { AppDispatch } from "@/redux/store";

const SceneGenerator = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useSelector(selectState);

  const [formData, setFormData] = useState({
    textModel: textModels.firstValue ?? "",
    pictureCount: 1,
    pictureModel: imageModels.firstValue ?? "",
    script: "",
  });

  const handlePromptChange = (script: string) => {
    setFormData((prev) => ({ ...prev, script }));
  };

  const handleDropdownChange =
    (key: "textModel" | "pictureCount" | "pictureModel") =>
    (selected: { label: string; value: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: selected.value,
      }));
    };

  const handleOnGenerate = () => {
    dispatch(
      fetchScenes({
        imagesPerScene: +formData.pictureCount,
        textModel: formData.textModel,
        prompt: formData.script,
        imageModel: formData.pictureModel,
      })
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={8} bg={"white"}>
      <HStack marginBottom={20}>
        <Heading size="sm" mb={3} w={"50%"}>
          Global Script Input
        </Heading>
        <HStack w={"50%"} justifyContent={"end"}>
          <DropDownMenu
            items={textModels}
            title={"AI Model"}
            onChange={handleDropdownChange("textModel")}
          />
          <DropDownMenu
            items={imagesPerScene}
            title={"Picture Count"}
            onChange={handleDropdownChange("pictureCount")}
          />
          <DropDownMenu
            items={imageModels}
            title={"Picture Model"}
            onChange={handleDropdownChange("pictureModel")}
          />
        </HStack>
      </HStack>

      <Textarea
        placeholder="Enter your complete script..."
        value={formData.script}
        onChange={(e) => handlePromptChange(e.target.value)}
        maxLength={20000}
        h={250}
      />
      <Text fontSize="sm" color="gray.500" textAlign="right">
        {formData.script.length}/2000 characters
      </Text>
      <Button
        mt={4}
        colorScheme="blue"
        disabled={!formData.script || isLoading}
        onClick={handleOnGenerate}
      >
        Generate
      </Button>
    </Box>
  );
};

export default SceneGenerator;
