export interface Task {
    id: string;
    title: string;
    dueDate: string;
    status: 'Pending' | 'In Progress' | 'Completed';
}
