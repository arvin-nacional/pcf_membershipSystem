import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type OptionType = {
  _id: string;
  name: string;
  value: string;
};

interface MultiSelectProps {
  members: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

function DiscipleSelect({
  members,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] w-full border ${
            selected.length > 1 ? "h-full" : "h-10"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div
            className="flex w-full flex-wrap gap-1
          "
          >
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="mb-1 mr-1 "
                onClick={() => handleUnselect(item)}
              >
                {item}
                <button
                  className="ring-offset-background focus:ring-ring ml-1  rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-dark300_light700 w-full p-0 opacity-100">
        <Command className={`${className} `}>
          <CommandInput
            placeholder="Search ..."
            className="text-dark300_light700"
          />
          <CommandEmpty className="text-dark300_light700">
            No item found.
          </CommandEmpty>
          <CommandGroup className="text-dark300_light700 max-h-64 overflow-auto opacity-100">
            {members.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option._id)
                      ? selected.filter((item) => item !== option._id)
                      : [...selected, option.name]
                  );
                  setOpen(true);
                }}
                className="text-dark300_light700 "
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { DiscipleSelect };
