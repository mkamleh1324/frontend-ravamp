import { ListCollection } from "@chakra-ui/react";

export interface IDropDownMenu {
  title: string;
  items: ListCollection<{
    label: string;
    value: string;
  }>;
}
