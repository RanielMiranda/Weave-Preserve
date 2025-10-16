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
                                {col.key === 'is_admin' ? (
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item[col.key] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item[col.key] ? 'Yes' : 'No'}
                                    </span>
                                ) : col.key === 'is_archived' ? (
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item[col.key] ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800' }`}>
                                        {item[col.key] ? 'Archived' : 'Available'}
                                    </span>
                                ) : (
                                    item[col.key]
                                )}
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
