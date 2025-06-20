import { Field, ErrorMessage } from 'formik';
interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
}
const InputField = ({ label, name, type = 'text', placeholder = '' }: InputFieldProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}
            </label>
            <Field
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full border rounded p-2"
            />
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
};
export default InputField;
