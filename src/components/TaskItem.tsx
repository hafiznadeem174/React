import { useState } from 'react';
import type { Task } from '../types';
import Button from "./Button.tsx";
import InputField from "./InputField.tsx";
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
    const handleSave = () => {
        onEdit({
            ...task,
            title: editTitle,
            dueDate: editDueDate,
            status: editStatus,
        });
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
                    {/*<input*/}
                    {/*    value={editTitle}*/}
                    {/*    onChange={(e) => setEditTitle(e.target.value)}*/}
                    {/*    className="w-full p-1 border rounded"*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="date"*/}
                    {/*    value={editDueDate}*/}
                    {/*    onChange={(e) => setEditDueDate(e.target.value)}*/}
                    {/*    className="w-full p-1 border rounded"*/}
                    {/*/>*/}
                    <InputField
                        label="Task Title"
                        value={editTitle}
                        onChange={setEditTitle}
                    />

                    <InputField
                        label="Due Date"
                        value={editDueDate}
                        onChange={setEditDueDate}
                        type="date"
                    />
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
                        <Button variant="primary"
                            onClick={handleSave}

                        >
                            Save
                        </Button>
                        <Button variant="danger"
                            onClick={() => setIsEditing(false)}

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
                    <div className="mt-2 flex space-x-2">
                        <Button variant="secondary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                        <Button variant="danger"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </Button>

                    </div>
                </>
            )}
        </li>
    );
};
export default TaskItem;
