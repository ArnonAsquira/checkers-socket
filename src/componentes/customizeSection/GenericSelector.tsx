import { FC } from "react";

interface IGenericSelectorProps {
  id: string;
  label: string;
  options: { text: string; id: string }[];
  onChange: Function;
}

const GenericSelector: FC<IGenericSelectorProps> = ({
  label,
  options,
  id,
  onChange,
}) => {
  return (
    <div className="generic-selector-div">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={options[0] && options[0].id}
      >
        {options.map((option, i) => (
          <option key={i} id={option.id}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenericSelector;
