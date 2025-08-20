import { ListCollection } from "@chakra-ui/react";

export interface IDropDownMenu {
  title: string;
  items: ListCollection<{
    label: string;
    value: string;
  }>;
  onChange?: (details: { label: string; value: string }) => void;
}
