import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../types';
import Button from "./Button.tsx";
import InputField from "./InputField.tsx";
interface TaskFormProps {
    onAddTask: (task: Task) => void;
}
const TaskForm = ({ onAddTask }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState<Task["status"]>('Pending'); // ✅ Properly typed
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !dueDate) return;
        const newTask: Task = {
            id: uuidv4(),
            title,
            dueDate,
            status,
        };
        onAddTask(newTask);
        setTitle('');
        setDueDate('');
        setStatus('Pending');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder="Task Title"*/}
            {/*    value={title}*/}
            {/*    onChange={(e) => setTitle(e.target.value)}*/}
            {/*    className="w-full border p-2 rounded"*/}
            {/*/>*/}
            <InputField
                label="Task Title"
                value={title}
                onChange={setTitle}
            />
            {/*<input*/}
            {/*    type="date"*/}
            {/*    value={dueDate}*/}
            {/*    onChange={(e) => setDueDate(e.target.value)}*/}
            {/*    className="w-full border p-2 rounded"*/}
            {/*/>*/}
            <InputField
                label="Date"
                type="date"
                value={dueDate}
                onChange={setDueDate}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])} // ✅ Type assertion
                className="w-full border p-2 rounded"
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <Button variant="primary"  >
                Add Task
            </Button>
        </form>
    );
};
export default TaskForm;
