import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../types';
import InputField  from './InputField';
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
    progress: Yup.number()
        .min(0, 'Progress must be at least 0')
        .max(100, 'Progress cannot exceed 100')
        .required('Progress is required'),
    attachment: Yup.string().required('Attachment is required'),
    color: Yup.string()
             .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color (e.g., #FF0000)')
             .required('Color is required'),
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
                progress: 0,
                attachment: '',
                color: '#000000',
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
                    progress: Number(values.progress),
                    attachment: values.attachment,
                    color: values.color,

                };
                onAddTask(newTask);
                resetForm();
            }}
        >
            {({ values }) => (
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
                    <InputField name="isUrgent" label="Urgent Task" type="checkbox" />
                    <InputField name="priority" label="Priority" />

                    <InputField name="progress" label="Progress (%)" type="range" values={values} />
                    <InputField name="attachment" label="Attachment" type="file" />
                    <InputField name="color" label="Color" type="color" />
                    <InputField
                        name="status"
                        label="Status"
                        type="select"
                        options={['Pending', 'In Progress', 'Completed']}
                    />

                    <div className="flex gap-2">
                <Button type="reset" variant="danger">Cancel</Button>
                    <Button type="submit" variant="primary">Add Task</Button>
                    </div>
            </Form>
            )}
        </Formik>
    );
};

export default TaskForm;
