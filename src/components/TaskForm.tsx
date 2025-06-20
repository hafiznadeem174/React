import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../types';
import InputField from './InputField';
import Button from './Button';
interface TaskFormProps {
    onAddTask: (task: Task) => void;
}
// const TaskSchema = Yup.object().shape({
//     title: Yup.string().required('Task title is required'),
//     dueDate: Yup.string().required('Due date is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     status: Yup.string()
//         .oneOf(['Pending', 'In Progress', 'Completed'], 'Invalid status')
//         .required('Status is required'),
// });
const TaskSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Task title must be at least 3 characters')
        .max(50, 'Task title cannot exceed 50 characters')
        .required('Task title is required'),
    dueDate: Yup.date()
        .min(new Date().toISOString().split('T')[0], 'Due date cannot be in the past')
        .required('Due date is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    status: Yup.string()
        .oneOf(['Pending', 'In Progress', 'Completed'], 'Invalid status')
        .required('Status is required'),
    phoneNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$|^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number format (e.g., 123-456-7890 or +12345678901)')
        .required('Phone number is required'),
    url: Yup.string()
        .url('Invalid URL format (e.g., https://example.com)')
        .required('URL is required'),
    isUrgent: Yup.boolean(),
    priority: Yup.string()
        .oneOf(['Low', 'Medium', 'High'], 'Invalid priority')
        .required('Priority is required'),
});
const TaskForm = ({ onAddTask }: TaskFormProps) => {
    return (
        <Formik
            initialValues={{
                title: '',
                dueDate: '',
                status: 'Pending',
                email: '', // ✅ NEW
                phoneNumber: '',
                url: '',
                isUrgent: false, // New field
                priority: 'Low',
            }}
            validationSchema={TaskSchema}
            onSubmit={(values, { resetForm }) => {
                const newTask: Task = {
                    id: uuidv4(),
                    title: values.title,
                    dueDate: values.dueDate,
                    email: values.email,
                    status: values.status as Task['status'],
                    phoneNumber: values.phoneNumber,
                    url: values.url,
                    isUrgent: values.isUrgent,
                    priority: values.priority as Task['priority'],
                };
                onAddTask(newTask);
                resetForm();
            }}
        >
            <Form className="space-y-4 bg-white p-4 rounded shadow">
                <InputField name="title" label="Task Title" />
                <InputField name="email" label="Email" type="email" /> {/* ✅ NEW */}
                <InputField name="dueDate" label="Due Date" type="date" />
                <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    placeholder="e.g., 123-456-7890 or +12345678901"
                />
                <InputField
                    name="url"
                    label="URL"
                    type="url"
                    placeholder="e.g., https://example.com"
                />
                <div className="flex items-center">
                    <Field
                        type="checkbox"
                        name="isUrgent"
                        className="mr-2"
                    />
                    <label htmlFor="isUrgent" className="text-sm font-medium">
                        Urgent Task
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm mb-1 font-medium">Priority</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <Field type="radio" name="priority" value="Low" className="mr-1" />
                            Low
                        </label>
                        <label className="flex items-center">
                            <Field type="radio" name="priority" value="Medium" className="mr-1" />
                            Medium
                        </label>
                        <label className="flex items-center">
                            <Field type="radio" name="priority" value="High" className="mr-1" />
                            High
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Status</label>
                    <Field as="select" name="status" className="w-full border p-2 rounded">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Field>
                </div>
                <Button type="submit" variant="primary">Add Task</Button>
            </Form>
        </Formik>
    );
};

export default TaskForm;
