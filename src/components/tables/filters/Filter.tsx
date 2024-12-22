import { Column } from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
type Props<T> = {
  column: Column<T, unknown>;
};
const Filter = <T,>({column}:Props<T>) => {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueVales = Array.from(column.getFacetedUniqueValues().keys()).sort()
  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueVales.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${[...column.getFacetedUniqueValues()].filter(
          (arr) => arr[0].length
        )})`}
        className="w-full border shadow rounded bg-card"
        list={column.id + "list"}
      />
    </>
  );
};
export default Filter;