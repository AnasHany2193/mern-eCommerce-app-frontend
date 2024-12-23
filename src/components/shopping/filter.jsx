import { Label } from "../ui/label";
import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-extrabold">Filters</h3>
      <Separator />

      {Object.entries(filterOptions).map(([keyItem, options]) => (
        <div key={keyItem} className="space-y-3">
          <h3 className="font-bold">{keyItem}</h3>
          <div className="grid grid-cols-2 gap-2 pl-3 mt-2 md:grid-cols-1">
            {options.map(({ id, label }) => (
              <Label
                key={id}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Checkbox
                  checked={filters?.[keyItem]?.includes(id) || false}
                  onCheckedChange={() => handleFilter(keyItem, id)}
                />
                {label}
              </Label>
            ))}
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
