import React from 'react';

export default function Select({
  className,
  options, defaultValue, value, onChange,
}) {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
        <option disabled value="">{defaultValue}</option>
        {options.map((option) => (
            <option key={option.name} value={option.value}>
                {option.name}
            </option>
        ))}
    </select>
  );
}
