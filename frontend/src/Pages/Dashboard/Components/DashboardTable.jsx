import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DashboardTable = ({ data, columns, handleAction, isEditable }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map(col => (
                        <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {col.header}
                        </th>
                    ))}
                    {isEditable && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map(item => (
                    <tr key={item.id}>
                        {columns.map(col => (
                            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item[col.key]}
                            </td>
                        ))}
                        {isEditable && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button onClick={() => handleAction('Edit', item)} className="text-orange-600 hover:text-orange-900">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleAction('Delete', item)} className="text-red-600 hover:text-red-900">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DashboardTable;
