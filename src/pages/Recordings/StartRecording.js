import React from "react";

const StartRecording = (props) => {
    const [experiment, setExperiment] = useState(null)

  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];

  const selectExperiment = (e) => {
setExperiment(e.target.value);
  }

  return (
    <>
      Select or create Experiments
      <select value={experiment} onChange={selectExperiment}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  );
};
