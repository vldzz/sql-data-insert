import EnhancedDataGenerator from './dataGenerators.js';

export class SQLGenerator {
  constructor(databaseType = 'mysql') {
    this.databaseType = databaseType.toLowerCase();
    this.generators = {
      mysql: new MySQLGenerator(),
      postgresql: new PostgreSQLGenerator(),
      sqlserver: new SQLServerGenerator(),
      sqlite: new SQLiteGenerator()
    };
  }

  generateCreateTable(tableName, columns) {
    return this.generators[this.databaseType].generateCreateTable(tableName, columns);
  }

  generateInsert(tableName, columns, rowCount) {
    return this.generators[this.databaseType].generateInsert(tableName, columns, rowCount);
  }

  generateStoredProcedure(tableName, columns) {
    return this.generators[this.databaseType].generateStoredProcedure(tableName, columns);
  }

  generateMigration(tableName, columns) {
    return this.generators[this.databaseType].generateMigration(tableName, columns);
  }
}

class BaseGenerator {
  getDataTypeMapping() {
    return {
      'Bit': 'BOOLEAN',
      'Tinyint': 'TINYINT',
      'Int': 'INT',
      'Bigint': 'BIGINT',
      'Float': 'FLOAT',
      'Decimal': 'DECIMAL(10,2)',
      'Money': 'DECIMAL(10,2)',
      'Date': 'DATE',
      'Time': 'TIME',
      'DateTime': 'DATETIME',
      'Nvarchar': 'VARCHAR(255)',
      'Text': 'TEXT',
      'Email': 'VARCHAR(255)',
      'Phone': 'VARCHAR(20)',
      'SSN': 'VARCHAR(11)',
      'CreditCard': 'VARCHAR(19)',
      'IPAddress': 'VARCHAR(45)',
      'URL': 'VARCHAR(500)',
      'Username': 'VARCHAR(50)',
      'Password': 'VARCHAR(255)',
      'Company': 'VARCHAR(100)',
      'JobTitle': 'VARCHAR(100)',
      'Department': 'VARCHAR(50)',
      'ProductName': 'VARCHAR(200)',
      'ProductDescription': 'TEXT',
      'Price': 'DECIMAL(10,2)',
      'ISBN': 'VARCHAR(13)',
      'UUID': 'VARCHAR(36)',
      'MacAddress': 'VARCHAR(17)',
      'Color': 'VARCHAR(7)',
      'Domain': 'VARCHAR(100)',
      'StreetAddress': 'VARCHAR(200)',
      'City': 'VARCHAR(100)',
      'State': 'VARCHAR(50)',
      'ZipCode': 'VARCHAR(10)',
      'Country': 'VARCHAR(100)',
      'Coordinates': 'VARCHAR(50)'
    };
  }

  generateColumnDefinition(column) {
    const dataType = this.getDataTypeMapping()[column.selectedOption] || 'VARCHAR(255)';
    let definition = `${column.colNameValue} ${dataType}`;
    
    if (column.radio === 'PK') {
      definition += ' PRIMARY KEY';
    } else if (column.radio === 'UQ') {
      definition += ' UNIQUE';
    }
    
    return definition;
  }

  generateDataValue(column, rowIndex) {
    switch (column.selectedOption) {
      case 'Bit':
        return Math.random() > 0.5 ? 1 : 0;
      
      case 'Tinyint':
        if (column.radio === 'PK') return rowIndex;
        return EnhancedDataGenerator.numbers_random(0, 255);
      
      case 'Int':
        if (column.intRangeState) {
          return EnhancedDataGenerator.numbers_random(column.min, column.max);
        }
        if (column.radio === 'PK') return rowIndex;
        return EnhancedDataGenerator.numbers();
      
      case 'Bigint':
        if (column.radio === 'PK') return rowIndex;
        return EnhancedDataGenerator.numbers() + '' + EnhancedDataGenerator.numbers() + '' + EnhancedDataGenerator.numbers();
      
      case 'Float':
        return EnhancedDataGenerator.numbers_float();
      
      case 'Decimal':
      case 'Money':
      case 'Price':
        return EnhancedDataGenerator.decimal();
      
      case 'Date':
        return EnhancedDataGenerator.date();
      
      case 'Time':
        return EnhancedDataGenerator.time();
      
      case 'DateTime':
        return EnhancedDataGenerator.dateTime();
      
      case 'Text':
      case 'ProductDescription':
        return EnhancedDataGenerator.text();
      
      case 'Email':
        return EnhancedDataGenerator.email();
      
      case 'Phone':
        return EnhancedDataGenerator.phone();
      
      case 'SSN':
        return EnhancedDataGenerator.ssn();
      
      case 'CreditCard':
        return EnhancedDataGenerator.creditCard();
      
      case 'IPAddress':
        return EnhancedDataGenerator.ipAddress();
      
      case 'URL':
        return EnhancedDataGenerator.url();
      
      case 'Username':
        return EnhancedDataGenerator.username();
      
      case 'Password':
        return EnhancedDataGenerator.password();
      
      case 'Company':
        return EnhancedDataGenerator.company();
      
      case 'JobTitle':
        return EnhancedDataGenerator.jobTitle();
      
      case 'Department':
        return EnhancedDataGenerator.department();
      
      case 'ProductName':
        return EnhancedDataGenerator.productName();
      
      case 'ISBN':
        return EnhancedDataGenerator.isbn();
      
      case 'UUID':
        return EnhancedDataGenerator.uuid();
      
      case 'MacAddress':
        return EnhancedDataGenerator.macAddress();
      
      case 'Color':
        return EnhancedDataGenerator.color();
      
      case 'Domain':
        return EnhancedDataGenerator.domain();
      
      case 'StreetAddress':
        return EnhancedDataGenerator.streetAddress();
      
      case 'City':
        return EnhancedDataGenerator.city();
      
      case 'State':
        return EnhancedDataGenerator.state();
      
      case 'ZipCode':
        return EnhancedDataGenerator.zipCode();
      
      case 'Country':
        return EnhancedDataGenerator.country();
      
      case 'Coordinates':
        return EnhancedDataGenerator.coordinates();
      
      case 'Nvarchar':
        switch (column.selectedDataOption) {
          case 'Names':
            return EnhancedDataGenerator.getName();
          case 'Last Name':
            return EnhancedDataGenerator.getLastName();
          case 'Cities':
            return EnhancedDataGenerator.getCity();
          case 'Countries':
            return EnhancedDataGenerator.getCountry();
          case 'Sample':
            return EnhancedDataGenerator.getSample();
          case 'Custom list':
            return this.getCustomListValue(column.customList, rowIndex);
          case 'Custom list nvarchar':
            return `'${this.getCustomListValue(column.customList, rowIndex)}'`;
          default:
            return EnhancedDataGenerator.getName();
        }
      
      default:
        return EnhancedDataGenerator.getName();
    }
  }

  getCustomListValue(customList, rowIndex) {
    if (!customList) return '';
    const items = customList.split(' ');
    return items[rowIndex % items.length] || items[0] || '';
  }
}

class MySQLGenerator extends BaseGenerator {
  generateCreateTable(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    return `CREATE TABLE ${tableName} (\n  ${columnDefinitions.join(',\n  ')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
  }

  generateInsert(tableName, columns, rowCount) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    let insertSQL = `INSERT INTO ${tableName} (${columnNames}) VALUES\n`;
    
    const values = [];
    for (let i = 1; i <= rowCount; i++) {
      const rowValues = columns.map(col => this.generateDataValue(col, i));
      values.push(`(${rowValues.join(', ')})`);
    }
    
    return insertSQL + values.join(',\n') + ';';
  }

  generateStoredProcedure(tableName, columns) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    const sampleValues = columns.map(col => this.generateDataValue(col, 1)).join(', ');
    
    return `
DELIMITER $$

CREATE PROCEDURE Insert${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Data(
  IN p_rowCount INT
)
BEGIN
  DECLARE i INT DEFAULT 1;
  
  WHILE i <= p_rowCount DO
    INSERT INTO ${tableName} (${columnNames})
    VALUES (${sampleValues});
    SET i = i + 1;
  END WHILE;
END$$

DELIMITER ;
    `.trim();
  }

  generateMigration(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    
    return `
-- Migration: Create ${tableName} table
-- Date: ${new Date().toISOString()}

CREATE TABLE ${tableName} (
  ${columnDefinitions.join(',\n  ')}
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add indexes if needed
-- CREATE INDEX idx_${tableName}_created_at ON ${tableName}(created_at);
    `.trim();
  }
}

class PostgreSQLGenerator extends BaseGenerator {
  getDataTypeMapping() {
    const baseMapping = super.getDataTypeMapping();
    return {
      ...baseMapping,
      'Bit': 'BOOLEAN',
      'Tinyint': 'SMALLINT',
      'Int': 'INTEGER',
      'Bigint': 'BIGINT',
      'Float': 'REAL',
      'Decimal': 'NUMERIC(10,2)',
      'Money': 'MONEY',
      'DateTime': 'TIMESTAMP',
      'Nvarchar': 'VARCHAR(255)',
      'Text': 'TEXT'
    };
  }

  generateCreateTable(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    return `CREATE TABLE ${tableName} (\n  ${columnDefinitions.join(',\n  ')}\n);`;
  }

  generateInsert(tableName, columns, rowCount) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    let insertSQL = `INSERT INTO ${tableName} (${columnNames}) VALUES\n`;
    
    const values = [];
    for (let i = 1; i <= rowCount; i++) {
      const rowValues = columns.map(col => this.generateDataValue(col, i));
      values.push(`(${rowValues.join(', ')})`);
    }
    
    return insertSQL + values.join(',\n') + ';';
  }

  generateStoredProcedure(tableName, columns) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    const sampleValues = columns.map(col => this.generateDataValue(col, 1)).join(', ');
    
    return `
CREATE OR REPLACE FUNCTION Insert${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Data(p_rowCount INTEGER)
RETURNS VOID AS $$
DECLARE
  i INTEGER := 1;
BEGIN
  WHILE i <= p_rowCount LOOP
    INSERT INTO ${tableName} (${columnNames})
    VALUES (${sampleValues});
    i := i + 1;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
    `.trim();
  }

  generateMigration(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    
    return `
-- Migration: Create ${tableName} table
-- Date: ${new Date().toISOString()}

CREATE TABLE ${tableName} (
  ${columnDefinitions.join(',\n  ')}
);

-- Add indexes if needed
-- CREATE INDEX idx_${tableName}_created_at ON ${tableName}(created_at);
    `.trim();
  }
}

class SQLServerGenerator extends BaseGenerator {
  getDataTypeMapping() {
    const baseMapping = super.getDataTypeMapping();
    return {
      ...baseMapping,
      'Bit': 'BIT',
      'Tinyint': 'TINYINT',
      'Int': 'INT',
      'Bigint': 'BIGINT',
      'Float': 'FLOAT',
      'Decimal': 'DECIMAL(10,2)',
      'Money': 'MONEY',
      'DateTime': 'DATETIME2',
      'Nvarchar': 'NVARCHAR(255)',
      'Text': 'NTEXT'
    };
  }

  generateCreateTable(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    return `CREATE TABLE ${tableName} (\n  ${columnDefinitions.join(',\n  ')}\n);`;
  }

  generateInsert(tableName, columns, rowCount) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    let insertSQL = `INSERT INTO ${tableName} (${columnNames}) VALUES\n`;
    
    const values = [];
    for (let i = 1; i <= rowCount; i++) {
      const rowValues = columns.map(col => this.generateDataValue(col, i));
      values.push(`(${rowValues.join(', ')})`);
    }
    
    return insertSQL + values.join(',\n') + ';';
  }

  generateStoredProcedure(tableName, columns) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    
    return `
CREATE PROCEDURE Insert${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Data
  @rowCount INT
AS
BEGIN
  DECLARE @i INT = 1;
  
  WHILE @i <= @rowCount
  BEGIN
    INSERT INTO ${tableName} (${columnNames})
    VALUES (${columns.map(col => this.generateDataValue(col, 1)).join(', ')});
    SET @i = @i + 1;
  END;
END;
    `.trim();
  }

  generateMigration(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    
    return `
-- Migration: Create ${tableName} table
-- Date: ${new Date().toISOString()}

CREATE TABLE ${tableName} (
  ${columnDefinitions.join(',\n  ')}
);

-- Add indexes if needed
-- CREATE INDEX idx_${tableName}_created_at ON ${tableName}(created_at);
    `.trim();
  }
}

class SQLiteGenerator extends BaseGenerator {
  getDataTypeMapping() {
    const baseMapping = super.getDataTypeMapping();
    return {
      ...baseMapping,
      'Bit': 'INTEGER',
      'Tinyint': 'INTEGER',
      'Int': 'INTEGER',
      'Bigint': 'INTEGER',
      'Float': 'REAL',
      'Decimal': 'REAL',
      'Money': 'REAL',
      'DateTime': 'TEXT',
      'Nvarchar': 'TEXT',
      'Text': 'TEXT'
    };
  }

  generateCreateTable(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    return `CREATE TABLE ${tableName} (\n  ${columnDefinitions.join(',\n  ')}\n);`;
  }

  generateInsert(tableName, columns, rowCount) {
    const columnNames = columns.map(col => col.colNameValue).join(', ');
    let insertSQL = `INSERT INTO ${tableName} (${columnNames}) VALUES\n`;
    
    const values = [];
    for (let i = 1; i <= rowCount; i++) {
      const rowValues = columns.map(col => this.generateDataValue(col, i));
      values.push(`(${rowValues.join(', ')})`);
    }
    
    return insertSQL + values.join(',\n') + ';';
  }

  generateStoredProcedure(tableName, columns) {
    // SQLite doesn't support stored procedures in the same way
    return `
-- SQLite doesn't support stored procedures like other databases
-- Use this function in your application code instead:

function insert${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Data(db, rowCount) {
  const columnNames = '${columns.map(col => col.colNameValue).join(', ')}';
  
  for (let i = 1; i <= rowCount; i++) {
    const values = [${columns.map(col => this.generateDataValue(col, 1)).join(', ')}];
    db.run(\`INSERT INTO ${tableName} (\${columnNames}) VALUES (\${values.map(() => '?').join(', ')})\`, values);
  }
}
    `.trim();
  }

  generateMigration(tableName, columns) {
    const columnDefinitions = columns.map(col => this.generateColumnDefinition(col));
    
    return `
-- Migration: Create ${tableName} table
-- Date: ${new Date().toISOString()}

CREATE TABLE ${tableName} (
  ${columnDefinitions.join(',\n  ')}
);

-- Add indexes if needed
-- CREATE INDEX idx_${tableName}_created_at ON ${tableName}(created_at);
    `.trim();
  }
}

export default SQLGenerator;