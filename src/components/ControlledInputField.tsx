interface ControlledInputFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
    placeholder?: string;
}
const ControlledInputField = ({
                                  label,
                                  value,
                                  onChange,
                                  type = 'text',
                                  placeholder = '',
                              }: ControlledInputFieldProps) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded p-2"
            />
        </div>
    );
};
export default ControlledInputField;
