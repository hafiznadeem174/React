import '../App.css';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import type { Task } from '../types';
import TaskItem from '../components/TaskItem';
import sixfood from '../assets/Image/sixfood.webp';
import sevenfood from '../assets/Image/sevenfood.webp';

const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'John Doe',
            status: 'Pending',
            dueDate: '2026-01-15',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
            url: 'https://johndoe.com',
            isUrgent: true,
            priority: 'High',
            progress: 10 ,
            attachment: 'data:application/pdf;base64,example1' ,
            image: sixfood,
            color: '#FF0000'
        },
        {
            id: '2',
            title: 'Jane Smith',
            status: 'In Progress',
            dueDate: '2026-03-22',
            email: 'jane@example.com',
            phoneNumber: '+12345678901',
            url: 'https://janesmith.com',
            isUrgent: true,
            priority: 'Medium' ,
            progress: 50 ,
            attachment: 'data:application/pdf;base64,example2' ,
            image: sevenfood,
            color: '#00FF00'
        },
        {
            id: '3',
            title: 'Alice Johnson',
            status: 'Completed',
            dueDate: '2026-06-01',
            email: 'alice@example.com',
            phoneNumber: '987-654-3210',
            url: 'https://alicejohnson.com',
            isUrgent: true,
            priority: 'Low',
            progress: 100 ,
            attachment: 'data:application/pdf;base64,example3' ,
            image: sixfood,
            color: '#0000FF'
        },
    ]);
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    const [filter, setFilter] = useState<'All' | Task['status']>('All');
    const pendingCount = tasks.filter((task) => task.status === 'Pending').length;
    const inProgressCount = tasks.filter((task) => task.status === 'In Progress').length;
    const completedCount = tasks.filter((task) => task.status === 'Completed').length;
    const filteredTasks = tasks.filter((task) =>
        filter === 'All' ? true : task.status === filter
    );
    const handleAddTask = (task: Task) => {
        setTasks([...tasks, task]);
    };
    const handleEditTask = (updatedTask: Task) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    };
    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-6 text-center">📝 Daily Task Manager</h1>
                    <TaskForm onAddTask={handleAddTask} />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-6 text-center">Your Tasks</h1>
                    <div className="mb-4">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as 'All' | Task['status'])}
                            className="w-full border p-2 rounded"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4 flex gap-4 text-sm font-medium">
                        <span className="text-red-600">🔴 Pending: {pendingCount}</span>
                        <span className="text-yellow-600">🟡 In Progress: {inProgressCount}</span>
                        <span className="text-green-600">✅ Completed: {completedCount}</span>
                    </div>
                    {filteredTasks.length === 0 ? (
                        <p className="text-gray-500">No tasks to show.</p>
                    ) : (
                        <ul className="space-y-3">
                            {filteredTasks.map((task) => (
                                <li key={task.id}>
                                    <TaskItem
                                        task={task}
                                        onEdit={handleEditTask}
                                        onDelete={handleDeleteTask}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
export default TaskManager;
