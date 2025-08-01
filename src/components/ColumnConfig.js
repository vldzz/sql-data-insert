import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTrash, FaKey, FaUnlock, FaCog } from 'react-icons/fa';

const ColumnConfig = ({ onColumnAdd, onColumnRemove, columns = [] }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedDataType, setSelectedDataType] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const dataTypes = [
    { value: 'Bit', label: 'Bit (Boolean)' },
    { value: 'Tinyint', label: 'Tinyint (0-255)' },
    { value: 'Int', label: 'Int (Integer)' },
    { value: 'Bigint', label: 'Bigint (Large Integer)' },
    { value: 'Float', label: 'Float (Decimal)' },
    { value: 'Decimal', label: 'Decimal (Precise Decimal)' },
    { value: 'Money', label: 'Money (Currency)' },
    { value: 'Date', label: 'Date' },
    { value: 'Time', label: 'Time' },
    { value: 'DateTime', label: 'DateTime' },
    { value: 'Nvarchar', label: 'Nvarchar (Text)' },
    { value: 'Text', label: 'Text (Long Text)' },
    { value: 'Email', label: 'Email' },
    { value: 'Phone', label: 'Phone Number' },
    { value: 'SSN', label: 'SSN' },
    { value: 'CreditCard', label: 'Credit Card' },
    { value: 'IPAddress', label: 'IP Address' },
    { value: 'URL', label: 'URL' },
    { value: 'Username', label: 'Username' },
    { value: 'Password', label: 'Password' },
    { value: 'Company', label: 'Company Name' },
    { value: 'JobTitle', label: 'Job Title' },
    { value: 'Department', label: 'Department' },
    { value: 'ProductName', label: 'Product Name' },
    { value: 'ProductDescription', label: 'Product Description' },
    { value: 'Price', label: 'Price' },
    { value: 'ISBN', label: 'ISBN' },
    { value: 'UUID', label: 'UUID' },
    { value: 'MacAddress', label: 'MAC Address' },
    { value: 'Color', label: 'Color' },
    { value: 'Domain', label: 'Domain' },
    { value: 'StreetAddress', label: 'Street Address' },
    { value: 'City', label: 'City' },
    { value: 'State', label: 'State' },
    { value: 'ZipCode', label: 'Zip Code' },
    { value: 'Country', label: 'Country' },
    { value: 'Coordinates', label: 'Coordinates' }
  ];

  const nvarcharOptions = [
    { value: 'Names', label: 'Names' },
    { value: 'Last Name', label: 'Last Names' },
    { value: 'Cities', label: 'Cities' },
    { value: 'Countries', label: 'Countries' },
    { value: 'Sample', label: 'Sample Text' },
    { value: 'Custom list', label: 'Custom List' },
    { value: 'Custom list nvarchar', label: 'Custom List (Quoted)' }
  ];

  const onSubmit = (data) => {
    const column = {
      colNameValue: data.columnName.toLowerCase(),
      selectedOption: data.dataType,
      radio: data.constraint || '',
      selectedDataOption: data.nvarcharOption || '',
      customList: data.customList || '',
      intRangeState: data.dataType === 'Int' && data.useRange,
      min: data.minRange || 0,
      max: data.maxRange || 1000
    };

    onColumnAdd(column);
    reset();
    setSelectedDataType('');
  };

  const handleDataTypeChange = (e) => {
    setSelectedDataType(e.target.value);
  };

  return (
    <div className="column-config">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <FaPlus className="me-2" />
            Add Column
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Column Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.columnName ? 'is-invalid' : ''}`}
                    placeholder="Enter column name"
                    {...register('columnName', { 
                      required: 'Column name is required',
                      pattern: {
                        value: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                        message: 'Invalid column name format'
                      }
                    })}
                  />
                  {errors.columnName && (
                    <div className="invalid-feedback">{errors.columnName.message}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Data Type</label>
                  <select
                    className={`form-select ${errors.dataType ? 'is-invalid' : ''}`}
                    {...register('dataType', { required: 'Data type is required' })}
                    onChange={handleDataTypeChange}
                  >
                    <option value="">Choose data type...</option>
                    {dataTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.dataType && (
                    <div className="invalid-feedback">{errors.dataType.message}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Nvarchar Options */}
            {selectedDataType === 'Nvarchar' && (
              <div className="mb-3">
                <label className="form-label">Text Type</label>
                <select
                  className="form-select"
                  {...register('nvarcharOption')}
                >
                  <option value="">Choose text type...</option>
                  {nvarcharOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Custom List Input */}
            {(selectedDataType === 'Nvarchar' && 
              (register('nvarcharOption').value === 'Custom list' || 
               register('nvarcharOption').value === 'Custom list nvarchar')) && (
              <div className="mb-3">
                <label className="form-label">Custom List (space-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="item1 item2 item3"
                  {...register('customList')}
                />
              </div>
            )}

            {/* Int Range Options */}
            {selectedDataType === 'Int' && (
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="useRange"
                    {...register('useRange')}
                  />
                  <label className="form-check-label" htmlFor="useRange">
                    Use custom range
                  </label>
                </div>
                
                {register('useRange').value && (
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min value"
                        {...register('minRange', { valueAsNumber: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max value"
                        {...register('maxRange', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Constraints */}
            <div className="mb-3">
              <label className="form-label">Constraints</label>
              <div className="btn-group" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="constraint"
                  id="none"
                  value=""
                  {...register('constraint')}
                />
                <label className="btn btn-outline-secondary" htmlFor="none">
                  None
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="constraint"
                  id="primary"
                  value="PK"
                  {...register('constraint')}
                />
                <label className="btn btn-outline-primary" htmlFor="primary">
                  <FaKey className="me-1" />
                  Primary Key
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="constraint"
                  id="unique"
                  value="UQ"
                  {...register('constraint')}
                />
                <label className="btn btn-outline-warning" htmlFor="unique">
                  <FaUnlock className="me-1" />
                  Unique
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              <FaPlus className="me-1" />
              Add Column
            </button>
          </form>
        </div>
      </div>

      {/* Existing Columns */}
      {columns.length > 0 && (
        <div className="card mt-4">
          <div className="card-header">
            <h6 className="mb-0">
              <FaCog className="me-2" />
              Configured Columns ({columns.length})
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Constraint</th>
                    <th>Options</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((column, index) => (
                    <tr key={index}>
                      <td>
                        <code>{column.colNameValue}</code>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{column.selectedOption}</span>
                      </td>
                      <td>
                        {column.radio === 'PK' && (
                          <span className="badge bg-primary">
                            <FaKey className="me-1" />
                            Primary Key
                          </span>
                        )}
                        {column.radio === 'UQ' && (
                          <span className="badge bg-warning">
                            <FaUnlock className="me-1" />
                            Unique
                          </span>
                        )}
                      </td>
                      <td>
                        {column.selectedDataOption && (
                          <small className="text-muted">{column.selectedDataOption}</small>
                        )}
                        {column.intRangeState && (
                          <small className="text-muted">
                            Range: {column.min}-{column.max}
                          </small>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onColumnRemove(index)}
                          title="Remove column"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnConfig;