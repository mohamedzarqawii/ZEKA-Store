import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type selectProps = {
  placeholder: string;
  selectItems: any[];
};

const SelectInput = ({ placeholder, selectItems }: selectProps) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full max-w-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectItems.map((item, i) => {
              return (
                <SelectItem key={i} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
