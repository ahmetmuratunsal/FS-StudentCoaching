import { useState } from "react";
import Select from "react-select";
import { filterOptions } from "../constants/selectInput.js";
import { useSearchParams } from "react-router-dom";

const FilterArea = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const handleFilterChange = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
    params.set("sort", `${selectedFilter.value},-reviewCount`);

    setParams(params);
    setSelectedFilter(null);
  };

  const [params, setParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const min = e.target[0].value;
    const max = e.target[1].value;

    params.set("min", min);
    params.set("max", max);

    setParams(params);
    e.target.reset();
  };

  return (
    <div className="mb-8 flex items-center justify-between gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <h3 className="font-semibold text-xl mr-5">Bütçe</h3>
        <label>Min Fiyat</label>
        <input
          className="max-md:w-1/4 border px-2 py-1 rounded-md"
          placeholder="min"
          type="number"
        />
        <label>Max Fiyat</label>
        <input
          className=" max-md:w-1/4 border px-2 py-1 rounded-md"
          placeholder="max"
          type="number"
        />
        <button className="bg-green-500 text-white text-xs font-semibold p-2 rounded-md transition hover:bg-green-600">
          Filtrele
        </button>
      </form>

      <Select
        className=" text-black  text-sm max-md:w-1/2 w-1/6"
        placeholder="Sırala"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={filterOptions}
      />
    </div>
  );
};

export default FilterArea;
