import { Select, Portal } from "@chakra-ui/react";
import { IDropDownMenu } from "./interface";

const DropDownMenu = ({ title, items }: IDropDownMenu) => {
  return (
    <Select.Root collection={items} size="sm" width="100px">
      <Select.HiddenSelect />
      <Select.Label>{title}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default DropDownMenu;
