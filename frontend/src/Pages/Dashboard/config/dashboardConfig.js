import { User } from "lucide-react";

export const dashboardConfig = {
    products: {
        title: 'Manage Products',
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'price', header: 'Price' },
            { key: 'status', header: 'Status' },
        ],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'price', label: 'Price', type: 'number' },
            { name: 'status', label: 'Status', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image Path', type: 'text' },
        ],
    },
    videos: {
        title: 'Manage Videos',
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'title', header: 'Title' },
            { key: 'description', header: 'Description' },
        ],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'filepath', label: 'Filepath', type: 'text' },
        ],
    },
    infographics: {
        title: 'Manage Infographics',
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'title', header: 'Title' },
        ],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'image_path', label: 'Image Path', type: 'text' },
        ],
    },
    fundraising: {
        title: 'Manage Fundraising',
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'title', header: 'Title' },
            { key: 'goal_amount', header: 'Goal' },
            { key: 'collected_amount', header: 'Collected' },
            { key: 'status', header: 'Status' },
        ],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'goal_amount', label: 'Goal Amount', type: 'number' },
            { name: 'collected_amount', label: 'Collected Amount', type: 'number' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'text' },
        ],
    },
    orders: {
        title: 'Manage Orders',
        columns: [
            { key: 'id', header: 'Order ID' },
            { key: 'customer_name', header: 'Customer' },
            { key: 'status', header: 'Status' },
        ],
        fields: [],
    },
    users: {
        title: 'Manage Users',
        icon: User,
        columns: [
            { key: 'id', header: 'User ID' },
            { key: 'email', header: 'Email' },
            { key: 'is_admin', header: 'Admin' },
            
        ],
        fields: [
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'is_admin', label: 'Is Admin', type: 'checkbox' },
        ],
    },
};
