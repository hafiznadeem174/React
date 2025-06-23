import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    options?: string[]; // for select
    values?: any;       // for progress slider value
}

const InputField = ({
                        label,
                        name,
                        type = 'text',
                        placeholder = '',
                        options = [],
                        values,
                    }: InputFieldProps) => {
    // Handle checkbox
    if (type === 'checkbox') {
        return (
            <div className="flex items-center mb-4">
                <Field type="checkbox" name={name} id={name} className="mr-2" />
                <label htmlFor={name} className="text-sm font-medium">{label}</label>
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm ml-2" />
            </div>
        );
    }

    // Handle radio for priority
    if (name === 'priority') {
        return (
            <div className="space-y-2 mb-4">
                <label className="block text-sm font-medium mb-1">{label}</label>
                <div className="flex space-x-4">
                    {['Low', 'Medium', 'High'].map((value) => (
                        <label key={value} className="flex items-center">
                            <Field
                                type="radio"
                                name={name}
                                value={value}
                                className="mr-1"
                            />
                            {value}
                        </label>
                    ))}
                </div>
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        );
    }

    // Handle range for progress
    if (type === 'range') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <Field
                    type="range"
                    name={name}
                    min="0"
                    max="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600">Value: {values?.[name]}%</div>
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        );
    }

    // Handle select for status
    if (type === 'select') {
        return (
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
                <Field as="select" name={name} className="w-full border p-2 rounded">
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Field>
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        );
    }

    // Handle file upload (PDF)
    if (type === 'file') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <Field name={name}>
                    {({ form }: { form: any }) => (
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file.type !== 'application/pdf') {
                                        form.setFieldError(name, 'Only PDF files are allowed');
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        form.setFieldValue(name, reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="w-full border p-2 rounded"
                        />
                    )}
                </Field>
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        );
    }

    // Handle color picker
    if (type === 'color') {
        return (
            <div className="space-y-2 mb-4">
                <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                <Field
                    type="color"
                    name={name}
                    className="w-full h-10 border rounded cursor-pointer"
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        );
    }

    // Default input field (text, email, date, etc.)
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
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
