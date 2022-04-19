import react, { ChangeEvent, FC, useEffect, useState } from "react";

interface IData {
  country_name: string;
  country_phone_code: string;
}

interface autoCompleteProps {
  data: any[];
}

export const AutoComplete: FC<autoCompleteProps> = ({ data }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<any>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    //showSuggestions is use for show suggestions list
    if (showSuggestions) {
      // function use for filter list by input name
      // after 3ms of change of input this function will call. for async search process.
      const delaySearchDataFn = setTimeout(() => {
        let suggestions = [];
        if (input.length > 0) {
          const regex = new RegExp(`^${input}`, "i");
          suggestions = data
            .sort()
            .filter((v: IData) => regex.test(v.country_name));
        }
        setFilteredSuggestions(suggestions);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      }, 500);

      // clear timeOut for put initial state.
      return () => clearTimeout(delaySearchDataFn);
    }
  }, [input, showSuggestions, data]);

  // call on input field change
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  // call after suggestion click
  const onSuggestionClick = (data: string) => {
    setFilteredSuggestions([]);
    setInput(data);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  return (
    <div>
      <div>
        <h2>Search your country name</h2>
      </div>
      <div className="auto-complete-wrapper">
        <div>
          <input
            id="input"
            autoComplete="off"
            value={input}
            onChange={onTextChanged}
            type={"text"}
          />
        </div>
        {showSuggestions && input ? (
          filteredSuggestions.length ? (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion: IData, index: number) => {
                let className;
                // Flag the active suggestion with a class
                if (index === activeSuggestionIndex) {
                  className = "suggestion-active";
                }
                return (
                  <li
                    className={className}
                    key={suggestion.country_name}
                    onClick={() => onSuggestionClick(suggestion.country_name)}>
                    {suggestion.country_name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="no-suggestions">
              <em>No suggestions, you're on your own!</em>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
