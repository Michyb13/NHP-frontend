"use client";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { customerIdData } from "@/utils/data";

type AutoCompleteInputProps = {
  customerId: string;
  ControlId: Dispatch<SetStateAction<string>>;
};

const AutoCompleteInput = ({
  customerId,
  ControlId,
}: AutoCompleteInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    ControlId(value);
    if (value.length > 0) {
      const filtered = customerIdData.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    setShowSuggestions(false);
    ControlId(suggestion);
  };
  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        value={customerId}
        placeholder="Customer Id"
        className="border border-gray-300 p-2 rounded-md"
        required
      />
      {showSuggestions && (
        <ul className="absolute border border-gray-300 bg-white mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Nothing Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
