import { Select, Portal } from "@chakra-ui/react";
import { IDropDownMenu } from "./interface";

const DropDownMenu = ({ title, items, onChange }: IDropDownMenu) => {
  const defaultItem = items.items[0];

  const onValueChange = (details: any) => {
    onChange?.({
      value: details.items[0].value,
      label: details.items[0].label,
    });
  };
  return (
    <Select.Root
      collection={items}
      size="sm"
      width="100px"
      onValueChange={onValueChange}
      defaultValue={[defaultItem?.value]}
    >
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
