import './App.css';
import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import type { Task } from './types';
import TaskItem from './components/TaskItem';
// import Button from "./components/Button.tsx";
const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        // { id: '1', title: 'John Doe', status: 'Pending', dueDate: '2025-01-15' },
        // { id: '2', title: 'Jane Smith', status: 'In Progress', dueDate: '2025-03-22' },
        // { id: '3', title: 'Alice Johnson', status: 'Completed', dueDate: '2025-06-01' },
    ]);

    // useEffect(() => {
    //     const fetchTasks = async ()=> {
    //         try {
    //             const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    //             const data = await res.json();
    //             const formattedTasks = data.map((item: any) => ({
    //                 id: item.id.toString(),
    //                 title: item.title,
    //                 status: item.completed ? 'Completed' : 'Pending'  ,
    //                 dueDate: new Date().toISOString().split('T')[0],
    //
    //             }) );
    //             setTasks(formattedTasks);
    //
    //         }
    //         catch (err) {
    //             console.error('Error fetching tasks:', err);
    //         }
    //     };
    //     fetchTasks();
    // }, []);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
                const data = await res.json();

                const formattedTasks = data.map((item: any) => {
                    let status: 'Pending' | 'In Progress' | 'Completed';

                    if (item.completed) {
                        status = 'Completed';
                    } else {
                        // 50% chance for 'Pending' or 'In Progress'
                        const rand = Math.random();
                        status = rand < 0.5 ? 'Pending' : 'In Progress';
                    }

                    return {
                        id: item.id.toString(),
                        title: item.title,
                        status,
                        dueDate: new Date().toISOString().split('T')[0],
                    };
                });

                setTasks(formattedTasks);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };

        fetchTasks();
    }, []);

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


            <div className="w-full flex gap-6">
                <div className="w-1/2">
                    <h1 className="text-3xl font-bold mb-6 text-center">📝 Daily Task Manager</h1>
                    <TaskForm onAddTask={handleAddTask} />
                </div>
                <div className="w-1/2">
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
export default App;
