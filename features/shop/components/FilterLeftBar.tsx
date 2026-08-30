"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { useEffect, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type FilterMenuType = {
  title: string;
  options: Option[];
};

interface FilterBarProps {
  filterMenu: FilterMenuType[];
  selectedCategories: string[];
  selectedBrands: string[];
  handleFilterChange?: (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  value?: number[];
  setValue?: React.Dispatch<React.SetStateAction<number[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterBar = ({
  filterMenu,
  selectedCategories,
  selectedBrands,
  setSelectedCategories,
  setSelectedBrands,
  setPriceRange,
  setCurrentPage,
}: FilterBarProps) => {
  const [tempCategories, setTempCategories] =
    useState<string[]>(selectedCategories);
  const [tempBrands, setTempBrands] = useState<string[]>(selectedBrands);
  const [tempPrice, setTempPrice] = useState<number[]>([0, 1000]);

  useEffect(() => {
    setTempCategories(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    setTempBrands(selectedBrands);
  }, [selectedBrands]);

  const handleTempCheckboxToggle = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleApply = () => {
    setSelectedCategories(tempCategories);
    setSelectedBrands(tempBrands);
    setPriceRange(tempPrice);
    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  const isUnchanged =
    tempCategories.length === selectedCategories.length &&
    tempCategories.every((cat) => selectedCategories.includes(cat)) &&
    tempBrands.length === selectedBrands.length &&
    tempBrands.every((brand) => selectedBrands.includes(brand)) &&
    tempPrice[0] === 0 &&
    tempPrice[1] === 1000;

  return (
    <div className="top-24 sticky flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl w-full max-w-xs h-fit">
      {/* Header */}
      <div className="flex flex-col gap-3 text-primary">
        <div>FILTERS</div>
        <div className="bg-primary w-full h-px"></div>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {filterMenu.map((menu, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="text-primary text-lg">{menu.title}</div>

            <div className="flex flex-col gap-5">
              {menu.options.map((option, j: number) => {
                const checkboxId = `${menu.title}-${j}`;

                return (
                  <div key={j} className="flex items-center gap-3">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={
                        menu.title === "CATEGORY"
                          ? tempCategories.includes(option.value)
                          : tempBrands.includes(option.value)
                      }
                      onChange={() => {
                        if (menu.title === "CATEGORY") {
                          handleTempCheckboxToggle(
                            option.value,
                            tempCategories,
                            setTempCategories,
                          );
                        }

                        if (menu.title === "BRAND") {
                          handleTempCheckboxToggle(
                            option.value,
                            tempBrands,
                            setTempBrands,
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={checkboxId}
                      className="text-zinc-400 text-sm cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Price Filter */}
        <div className="flex flex-col gap-4 w-full">
          <div>
            <Field className="w-full max-w-xs">
              <FieldTitle className="text-primary text-lg">PRICE</FieldTitle>
              <FieldDescription className="text-sm">
                ($
                <span className="font-medium tabular-nums">
                  {tempPrice[0]}
                </span>{" "}
                -{" "}
                <span className="font-medium tabular-nums">{tempPrice[1]}</span>
                )
              </FieldDescription>
              <Slider
                value={tempPrice}
                onValueChange={(val) => setTempPrice(val)}
                min={0}
                max={1000}
                step={10}
                className="mt-2 w-full"
                aria-label="Price Range"
              />
            </Field>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          variant={"default"}
          disabled={isUnchanged}
          size={"default"}
          className="w-full cursor-pointer"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
