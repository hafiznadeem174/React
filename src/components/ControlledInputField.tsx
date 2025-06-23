export interface ControlledInputFieldProps {
    label: string;
    name: string;
    value: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    type?: 'text' | 'email' | 'date' | 'url' | 'checkbox' | 'range' | 'file' | 'color' | 'select' | 'radio';
    placeholder?: string;
    options?: string[]; // For select or radio
    min?: number; // For range
    max?: number; // For range
    accept?: string; // For file
}

const ControlledInputField = ({
                                  label,
                                  name,
                                  value,
                                  onChange,
                                  type = 'text',
                                  placeholder = '',
                                  options = [],
                                  min,
                                  max,
                                  accept,
                              }: ControlledInputFieldProps) => {
    // Handle checkbox
    if (type === 'checkbox') {
        return (
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    name={name}
                    checked={value as boolean}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor={name} className="text-sm font-medium">{label}</label>
            </div>
        );
    }

    // Handle radio
    if (type === 'radio') {
        return (
            <div className="space-y-2 mb-4">
                <label className="block text-sm font-medium mb-1">{label}</label>
                <div className="flex space-x-4">
                    {options.map((option) => (
                        <label key={option} className="flex items-center">
                            <input
                                type="radio"
                                name={name}
                                value={option}
                                checked={value === option}
                                onChange={() => onChange(option)}
                                className="mr-1"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    // Handle range
    if (type === 'range') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <input
                    type="range"
                    name={name}
                    min={min}
                    max={max}
                    value={value as number}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600">Value: {value}%</div>
            </div>
        );
    }

    // Handle select
    if (type === 'select') {
        return (
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
                <select
                    name={name}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // Handle file
    if (type === 'file') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                onChange(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    className="w-full border p-2 rounded"
                />
            </div>
        );
    }

    // Handle color
    if (type === 'color') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <input
                    type="color"
                    name={name}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 border rounded cursor-pointer"
                />
            </div>
        );
    }

    // Default input (text, email, date, url)
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded p-2"
            />
        </div>
    );
};

export default ControlledInputField;