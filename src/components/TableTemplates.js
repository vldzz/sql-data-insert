import React, { useState } from 'react';
import { FaUsers, FaShoppingCart, FaBook, FaHospital, FaIndustry, FaGraduationCap } from 'react-icons/fa';

const TableTemplates = ({ onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'users',
      name: 'Users Management',
      icon: <FaUsers />,
      description: 'User accounts with authentication data',
      columns: [
        { name: 'id', type: 'Int', isPrimary: true },
        { name: 'username', type: 'Nvarchar', dataType: 'Names' },
        { name: 'email', type: 'Nvarchar', dataType: 'Email' },
        { name: 'created_at', type: 'DateTime' },
        { name: 'is_active', type: 'Bit' }
      ]
    },
    {
      id: 'products',
      name: 'E-commerce Products',
      icon: <FaShoppingCart />,
      description: 'Product catalog with pricing',
      columns: [
        { name: 'product_id', type: 'Int', isPrimary: true },
        { name: 'name', type: 'Nvarchar', dataType: 'Names' },
        { name: 'description', type: 'Text' },
        { name: 'price', type: 'Decimal' },
        { name: 'stock_quantity', type: 'Int' },
        { name: 'category', type: 'Nvarchar', dataType: 'Cities' }
      ]
    },
    {
      id: 'library',
      name: 'Library Management',
      icon: <FaBook />,
      description: 'Books and authors database',
      columns: [
        { name: 'book_id', type: 'Int', isPrimary: true },
        { name: 'title', type: 'Nvarchar', dataType: 'Names' },
        { name: 'author', type: 'Nvarchar', dataType: 'Last Name' },
        { name: 'isbn', type: 'Nvarchar', dataType: 'ISBN' },
        { name: 'published_year', type: 'Int' },
        { name: 'genre', type: 'Nvarchar', dataType: 'Cities' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Records',
      icon: <FaHospital />,
      description: 'Patient and medical records',
      columns: [
        { name: 'patient_id', type: 'Int', isPrimary: true },
        { name: 'first_name', type: 'Nvarchar', dataType: 'Names' },
        { name: 'last_name', type: 'Nvarchar', dataType: 'Last Name' },
        { name: 'date_of_birth', type: 'Date' },
        { name: 'phone', type: 'Nvarchar', dataType: 'Phone' },
        { name: 'ssn', type: 'Nvarchar', dataType: 'SSN' }
      ]
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: <FaIndustry />,
      description: 'Production and inventory tracking',
      columns: [
        { name: 'item_id', type: 'Int', isPrimary: true },
        { name: 'item_name', type: 'Nvarchar', dataType: 'Names' },
        { name: 'quantity', type: 'Int' },
        { name: 'unit_cost', type: 'Decimal' },
        { name: 'supplier', type: 'Nvarchar', dataType: 'Companies' },
        { name: 'last_updated', type: 'DateTime' }
      ]
    },
    {
      id: 'education',
      name: 'Education System',
      icon: <FaGraduationCap />,
      description: 'Students and courses management',
      columns: [
        { name: 'student_id', type: 'Int', isPrimary: true },
        { name: 'first_name', type: 'Nvarchar', dataType: 'Names' },
        { name: 'last_name', type: 'Nvarchar', dataType: 'Last Name' },
        { name: 'email', type: 'Nvarchar', dataType: 'Email' },
        { name: 'enrollment_date', type: 'Date' },
        { name: 'gpa', type: 'Decimal' }
      ]
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    onTemplateSelect(template);
  };

  return (
    <div className="table-templates">
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4">
            <FaBook className="me-2" />
            Table Templates
          </h4>
          <p className="text-muted mb-4">
            Choose from pre-built templates to quickly get started with common database structures.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {templates.map((template) => (
          <div key={template.id} className="col-md-6 col-lg-4">
            <div 
              className={`card h-100 cursor-pointer ${selectedTemplate?.id === template.id ? 'border-primary' : ''}`}
              onClick={() => handleTemplateSelect(template)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="text-primary me-3">
                    {template.icon}
                  </div>
                  <h6 className="card-title mb-0">{template.name}</h6>
                </div>
                <p className="card-text text-muted small">{template.description}</p>
                
                <div className="mt-3">
                  <small className="text-muted">Columns:</small>
                  <div className="mt-1">
                    {template.columns.map((col, index) => (
                      <span 
                        key={index} 
                        className={`badge me-1 mb-1 ${col.isPrimary ? 'bg-primary' : 'bg-secondary'}`}
                      >
                        {col.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedTemplate?.id === template.id && (
                <div className="card-footer bg-primary text-white">
                  <small>Selected</small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-4">
          <div className="alert alert-info">
            <strong>Selected Template:</strong> {selectedTemplate.name}
            <button 
              className="btn btn-sm btn-primary ms-3"
              onClick={() => onTemplateSelect(selectedTemplate)}
            >
              Use This Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTemplates;