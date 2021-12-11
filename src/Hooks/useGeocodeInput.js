import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [fullResult, setFullResult] = useState();

  const handleChange = async (event) => {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}&autocomplete=true`;
      const response = await fetch(endpoint);
      const result = await response.json();
      console.log({ result_features: result?.features });
      setSuggestions(result?.features);
      setFullResult(result);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
    fullResult,
  };
};

export default useInput;
