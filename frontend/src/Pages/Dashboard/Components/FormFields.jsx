import React from 'react';

const FormFields = ({ fields, formData, handleChange }) => {
    if (!fields.length) return <p>This section is for viewing only.</p>;

    return fields.map(field => (
        <div key={field.name} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'textarea' ? (
                <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                    rows="4"
                />
            ) : (
                <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                />
            )}
        </div>
    ));
};

export default FormFields;
