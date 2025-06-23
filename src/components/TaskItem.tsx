import { useState } from 'react';
import type { Task } from '../types';
import Button from './Button';
import ControlledInputField from './ControlledInputField';
import type { ControlledInputFieldProps } from './ControlledInputField';
interface Props {
    task: Task;
    onEdit: (updatedTask: Task) => void;
    onDelete: (id: string) => void;
}
const getFileNameFromDataUrl = (attachment: string, taskId: string) => {
    const mimeType = attachment.split(';')[0].split(':')[1];
    return mimeType === 'application/pdf' ? `task-${taskId}.pdf` : `task-${taskId}.pdf`;
};
const TaskItem = ({ task, onEdit, onDelete }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState<Task>({ ...task });
    const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});
    const validateField = (name: keyof Task, value: Task[keyof Task]): string | null => {
        switch (name) {
            case 'title': {
                const title = value as string;
                if (title.length < 3) return 'Task title must be at least 3 characters';
                if (title.length > 50) return 'Task title cannot exceed 50 characters';
                return null;
            }
            case 'dueDate': {
                const today = new Date().toISOString().split('T')[0];
                const dueDate = value as string;
                if (dueDate < today) return 'Due date cannot be in the past';
                return null;
            }
            case 'email': {
                const email = value as string;
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
                return null;
            }
            case 'phoneNumber': {
                const phoneNumber = value as string;
                if (!/^\+?[1-9]\d{1,14}$|^\d{3}-\d{3}-\d{4}$/.test(phoneNumber))
                    return 'Invalid phone number format (e.g., 123-456-7890 or +12345678901)';
                return null;
            }
            case 'url': {
                const url = value as string;
                if (!/^(https?:\/\/)[^\s/$.?#].[^\s]*$/.test(url))
                    return 'Invalid URL format (e.g., https://example.com)';
                return null;
            }
            case 'priority': {
                const priority = value as Task['priority'];
                if (!['Low', 'Medium', 'High'].includes(priority)) return 'Invalid priority';
                return null;
            }
            case 'progress': {
                const progress = value as number;
                if (progress < 0 || progress > 100) return 'Progress must be between 0 and 100';
                return null;
            }
            case 'attachment': {
                const attachment = value as string;
                if (!attachment) return 'Attachment is required';
                if (attachment.startsWith('data:') && !attachment.includes('application/pdf'))
                    return 'Only PDF files are allowed';
                return null;
            }
            case 'color': {
                const color = value as string;
                if (!color) return 'Color is required';
                if (!/^#[0-9A-Fa-f]{6}$/.test(color)) return 'Invalid hex color (e.g., #FF0000)';
                return null;
            }
            case 'status': {
                const status = value as Task['status'];
                if (!['Pending', 'In Progress', 'Completed'].includes(status)) return 'Invalid status';
                return null;
            }
            default:
                return null;
        }
    };
    const handleChange = (name: keyof Task, value: string | boolean | number) => {
        setEditValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };
    const handleSave = () => {
        const newErrors: Partial<Record<keyof Task, string>> = {};
        (Object.keys(editValues) as (keyof Task)[]).forEach((key) => {
            const error = validateField(key, editValues[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onEdit(editValues);
        setErrors({});
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditValues({ ...task });
        setErrors({});
        setIsEditing(false);
    };
    const getStatusColor = () => {
        switch (task.status) {
            case 'Completed':
                return 'bg-green-100 border-green-500';
            case 'In Progress':
                return 'bg-yellow-100 border-yellow-500';
            default:
                return 'bg-red-100 border-red-500';
        }
    };
    const inputFields: {
        name: keyof Task;
        label: string;
        type?: ControlledInputFieldProps['type'];
        placeholder?: string;
        options?: string[];
        min?: number;
        max?: number;
        accept?: string;
    }[] = [
        { name: 'title', label: 'Task Title', placeholder: 'Enter task title' },
        { name: 'dueDate', label: 'Due Date', type: 'date' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phoneNumber', label: 'Phone Number', placeholder: 'e.g., 123-456-7890 or +12345678901' },
        { name: 'url', label: 'URL', type: 'url', placeholder: 'e.g., https://example.com' },
        { name: 'isUrgent', label: 'Urgent Task', type: 'checkbox' },
        { name: 'priority', label: 'Priority', type: 'radio', options: ['Low', 'Medium', 'High'] },
        { name: 'progress', label: 'Progress (%)', type: 'range', min: 0, max: 100 },
        { name: 'attachment', label: 'Attachment', type: 'file', accept: 'application/pdf' },
        { name: 'color', label: 'Color', type: 'color' },
        { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] },
    ];

    return (
        <li className={`rounded p-3 shadow border-l-4 ${getStatusColor()}`}>
            {isEditing ? (
                <div className="space-y-2">
                    {inputFields.map(({ name, label, type, placeholder, options, min, max, accept }) => (
                        <div key={name}>
                            <ControlledInputField
                                label={label}
                                name={name}
                                value={editValues[name]}
                                onChange={(value: string | boolean | number) => handleChange(name, value)}
                                type={type}
                                placeholder={placeholder}
                                options={options}
                                min={min}
                                max={max}
                                accept={accept}
                            />
                            {errors[name] && <div className="text-red-500 text-sm mt-1">{errors[name]}</div>}
                        </div>
                    ))}
                    <div className="flex space-x-2">
                        <Button variant="primary" type="submit" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="danger" type="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="font-medium">{task.title}</div>
                    <div className="flex w-full py-0.5">
                        <div className="text-sm w-1/2 text-gray-600">
                            Status: {task.status} | Due: {task.dueDate}
                        </div>
                        <div className="text-sm w-1/2 text-gray-600">📧 Email: {task.email}</div>
                    </div>
                    <div className="flex w-full py-0.5">
                        <div className="text-sm w-1/2 text-gray-600">📞 Phone: {task.phoneNumber}</div>
                        <div className="text-sm w-1/2 text-gray-600">🌐 URL: {task.url}</div>
                    </div>
                    <div className="flex w-full py-0.5">
                        <div className="text-sm w-1/2 text-gray-600">
                            🚨 Urgent: {task.isUrgent ? 'Yes' : 'No'}
                        </div>
                        <div className="text-sm w-1/2 text-gray-600">📊 Priority: {task.priority}</div>
                    </div>
                    <div className="text-sm w-1/2">
                        <span className="text-gray-600 mb-1 block">📈 Progress: {task.progress}%</span>
                        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    task.progress < 30 ? 'bg-red-500' : task.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${task.progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 my-1 text-sm">
                        <span className="text-gray-600 flex items-center gap-2">
                            🎨 Color: <span className="inline-block w-5 h-5 rounded" style={{ backgroundColor: task.color }}></span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600 hover:underline">
                            📎 Attachment:{' '}
                            <a
                                href={task.attachment}
                                download={getFileNameFromDataUrl(task.attachment, task.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download {getFileNameFromDataUrl(task.attachment, task.id)}
                            </a>
                        </span>
                    </div>
                    <div className="mt-2 flex space-x-2 py-0.5">
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(task.id)}>
                            Delete
                        </Button>
                    </div>
                </>
            )}
        </li>
    );
};
export default TaskItem;