
import { useState } from 'react';
import type { Task } from '../types';
import Button from './Button.tsx';
import ControlledInputField from './ControlledInputField.tsx';
interface Props {
    task: Task;
    onEdit: (updatedTask: Task) => void;
    onDelete: (id: string) => void;
}
const TaskItem = ({ task, onEdit, onDelete }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDueDate, setEditDueDate] = useState(task.dueDate);
    const [editStatus, setEditStatus] = useState<Task['status']>(task.status);
    const [editEmail, setEditEmail] = useState(task.email);
    const [editPhoneNumber, setEditPhoneNumber] = useState(task.phoneNumber);
    const [editUrl, setEditUrl] = useState(task.url);
    const [editIsUrgent, setEditIsUrgent] = useState(task.isUrgent);
    const [editPriority, setEditPriority] = useState<Task['priority']>(task.priority);
    const [priorityError, setPriorityError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [dueDateError, setDueDateError] = useState<string | null>(null);
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateTitle = (title: string) => {
        if (title.length < 3) {
            return 'Task title must be at least 3 characters';
        }
        if (title.length > 50) {
            return 'Task title cannot exceed 50 characters';
        }
        return null;
    };

    const validateDueDate = (dueDate: string) => {
        const today = new Date().toISOString().split('T')[0];
        if (dueDate < today) {
            return 'Due date cannot be in the past';
        }
        return null;
    };
    const validateUrl = (url: string) => {
        const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
        if (!urlRegex.test(url)) {
            return 'Invalid URL format (e.g., https://example.com)';
        }
        return null;
    };
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format';
        }
        return null;
    };
    const validatePriority = (priority: string) => {
        if (!['Low', 'Medium', 'High'].includes(priority)) {
            return 'Priority is required';
        }
        return null;
    };
    // const validatePhoneNumber = (phoneNumber: string) => {
    //     const phoneRegex = /^\+?[1-9]\d{1,14}$|^\d{3}-\d{3}-\d{4}$/;
    //     if (!phoneRegex.test(phoneNumber)) {
    //         return 'Invalid phone number format (e.g., 123-456-7890 or +12345678901)';
    //     }
    //     return null;
    // };
    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$|^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return 'Invalid phone number format (e.g., 123-456-7890 or +12345678901)';
        }
        return null;
    };

    const handleSave = () => {
        const titleError = validateTitle(editTitle);
        const dueDateError = validateDueDate(editDueDate);
        const emailError = validateEmail(editEmail);
        const phoneNumberError = validatePhoneNumber(editPhoneNumber);
        const urlError = validateUrl(editUrl);
        const priorityError = validatePriority(editPriority);
        if (titleError || dueDateError || emailError || phoneNumberError || urlError || priorityError) {
            setTitleError(titleError);
            setDueDateError(dueDateError);
            setEmailError(emailError);
            setPhoneNumberError(phoneNumberError);
            setUrlError(urlError);
            setPriorityError(priorityError);
            return;
        }
        onEdit({
            ...task,
            title: editTitle,
            dueDate: editDueDate,
            status: editStatus,
            email: editEmail,
            phoneNumber: editPhoneNumber,
            url: editUrl,
            isUrgent: editIsUrgent,
            priority: editPriority,
        });
        setTitleError(null);
        setDueDateError(null);
        setEmailError(null);
        setPhoneNumberError(null);
        setUrlError(null);
        setPriorityError(null);
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

    return (
        <li className={`rounded p-3 shadow border-l-4 ${getStatusColor()}`}>
            {isEditing ? (
                <div className="space-y-2">
                    <ControlledInputField
                        label="Task Title"
                        value={editTitle}
                        onChange={(value) => {
                            setEditTitle(value);
                            setTitleError(validateTitle(value));
                        }}
                        placeholder="Enter task title"
                    />
                    {titleError && (
                        <div className="text-red-500 text-sm mt-1">{titleError}</div>
                    )}
                    <ControlledInputField
                        label="Due Date"
                        type="date"
                        value={editDueDate}
                        onChange={(value) => {
                            setEditDueDate(value);
                            setDueDateError(validateDueDate(value));
                        }}
                    />
                    {dueDateError && (
                        <div className="text-red-500 text-sm mt-1">{dueDateError}</div>
                    )}
                    <ControlledInputField
                        label="Email"
                        type="email"
                        value={editEmail}
                        onChange={(value) => {
                            setEditEmail(value);
                            setEmailError(validateEmail(value));
                        }}
                    />
                    {emailError && (
                        <div className="text-red-500 text-sm mt-1">{emailError}</div>
                    )}
                    {/*<ControlledInputField*/}
                    {/*    label="Phone Number"*/}
                    {/*    type="text"*/}
                    {/*    value={editPhoneNumber}*/}
                    {/*    onChange={(value) => {*/}
                    {/*        setEditPhoneNumber(value);*/}
                    {/*        setPhoneNumberError(validatePhoneNumber(value));*/}
                    {/*    }}*/}
                    {/*    placeholder="e.g., 123-456-7890 or +12345678901"*/}
                    {/*/>*/}
                    {/*{phoneNumberError && (*/}
                    {/*    <div className="text-red-500 text-sm mt-1">{phoneNumberError}</div>*/}
                    {/*)}*/}
                    <ControlledInputField
                        label="Phone Number"
                        type="text"
                        value={editPhoneNumber}
                        onChange={(value) => {
                            setEditPhoneNumber(value);
                            setPhoneNumberError(validatePhoneNumber(value));
                        }}
                        placeholder="e.g., 123-456-7890 or +12345678901"
                    />
                    {phoneNumberError && (
                        <div className="text-red-500 text-sm mt-1">{phoneNumberError}</div>
                    )}
                    <ControlledInputField
                        label="URL"
                        type="url"
                        value={editUrl}
                        onChange={(value) => {
                            setEditUrl(value);
                            setUrlError(validateUrl(value));
                        }}
                        placeholder="e.g., https://example.com"
                    />
                    {urlError && (
                        <div className="text-red-500 text-sm mt-1">{urlError}</div>
                    )}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={editIsUrgent}
                            onChange={(e) => setEditIsUrgent(e.target.checked)}
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
                                <input
                                    type="radio"
                                    name="priority"
                                    value="Low"
                                    checked={editPriority === 'Low'}
                                    onChange={() => setEditPriority('Low')}
                                    className="mr-1"
                                />
                                Low
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="Medium"
                                    checked={editPriority === 'Medium'}
                                    onChange={() => setEditPriority('Medium')}
                                    className="mr-1"
                                />
                                Medium
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="High"
                                    checked={editPriority === 'High'}
                                    onChange={() => setEditPriority('High')}
                                    className="mr-1"
                                />
                                High
                            </label>
                        </div>
                        {priorityError && (
                            <div className="text-red-500 text-sm mt-1">{priorityError}</div>
                        )}
                    </div>
                    <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as Task['status'])}
                        className="w-full p-1 border rounded"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className="flex space-x-2">
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setIsEditing(false);
                                setTitleError(null);
                                setDueDateError(null);
                                setEmailError(null);
                                setPhoneNumberError(null);
                                setUrlError(null);
                                setEditTitle(task.title);
                                setEditDueDate(task.dueDate);
                                setEditStatus(task.status);
                                setEditEmail(task.email);
                                setEditPhoneNumber(task.phoneNumber);
                                setEditUrl(task.url);
                                setEditIsUrgent(task.isUrgent);
                                setPriorityError(null);
                                setEditPriority(task.priority);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-600">
                        Status: {task.status} | Due: {task.dueDate}
                    </div>
                    <div className="text-sm text-gray-600">📧 Email: {task.email}</div>
                    <div className="text-sm text-gray-600">📞 Phone: {task.phoneNumber}</div>
                    <div className="text-sm text-gray-600">🌐 URL: {task.url}</div>

                    <div className="text-sm text-gray-600">
                        🚨 Urgent: {task.isUrgent ? 'Yes' : 'No'}
                    </div>
                    <div className="text-sm text-gray-600">📊 Priority: {task.priority}</div>
                    <div className="mt-2 flex space-x-2">
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
