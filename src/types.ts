export interface Task {
    id: string;
    title: string;
    dueDate: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    email: string;
    phoneNumber: string;
    url: string;
    isUrgent: boolean;
    priority: 'Low' | 'Medium' | 'High';
}
