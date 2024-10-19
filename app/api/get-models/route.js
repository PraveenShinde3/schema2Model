import { NextResponse } from "next/server";

const generateModelsFromSQL = (sql) => {
  const tables = parseSQL(sql);
  console.log(tables);
  const models = {};

  Object.keys(tables).forEach((tableName) => {
    const columns = tables[tableName];

    // Generate models for each language
    models[tableName] = {
      Python: generatePythonModel(tableName, columns),
      JavaScript: generateJSModel(tableName, columns),
      TypeScript: generateTSModel(tableName, columns),
      Java: generateJavaModel(tableName, columns),
      Csharp: generateCSharpModel(tableName, columns),
      Ruby: generateRubyModel(tableName, columns),
      PHP: generatePHPModel(tableName, columns),
      Go: generateGoModel(tableName, columns),
      Kotlin: generateKotlinModel(tableName, columns),
      Swift: generateSwiftModel(tableName, columns),
      Rust: generateRustModel(tableName, columns),
    };
  });

  return models;
};

const parseSQL = (sql) => {
  const tables = {};
  const tableRegex = /CREATE TABLE (\w+) \(([\s\S]+?)\);/g;
  let match;

  while ((match = tableRegex.exec(sql)) !== null) {
    const tableName = match[1];
    const columnDefinitions = match[2].trim().split(",\n");
    const columns = [];

    columnDefinitions.forEach((colDef) => {
      const [name, type] = colDef.trim().split(/\s+/);
      columns.push({ name, type });
    });

    tables[tableName] = columns;
  }

  return tables;
};

// Generate Python model
const generatePythonModel = (tableName, columns) => {
  let model = `class ${tableName}:\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToPython(col.type);
    model += `    ${col.name} = ${fieldType}\n`;
  });
  return model;
};

// Generate JavaScript model (Mongoose schema)
const generateJSModel = (tableName, columns) => {
  let model = `
  const mongoose = require('mongoose');
  
  const ${tableName}Schema = new mongoose.Schema({\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToJS(col.type);
    model += `    ${col.name}: { type: ${fieldType}, required: true },\n`;
  });
  model += `});
  
  const ${tableName} = mongoose.model('${tableName}', ${tableName}Schema);
      `;
  return model;
};

// Generate TypeScript model
const generateTSModel = (tableName, columns) => {
  let model = `interface ${tableName} {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToTS(col.type);
    model += `    ${col.name}: ${fieldType};\n`;
  });
  model += `}\n`;
  return model;
};

// Generate Java model
const generateJavaModel = (tableName, columns) => {
  let model = `import javax.persistence.*;\n\n@Entity\npublic class ${tableName} {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToJava(col.type);
    model += `    private ${fieldType} ${col.name};\n`;
  });
  model += `}\n`;
  return model;
};

// Generate C# model
const generateCSharpModel = (tableName, columns) => {
  let model = `public class ${tableName} {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToCSharp(col.type);
    model += `    public ${fieldType} ${col.name} { get; set; }\n`;
  });
  model += `}\n`;
  return model;
};

// Generate Ruby model
const generateRubyModel = (tableName, columns) => {
  let model = `class ${tableName} < ApplicationRecord\n`;
  columns.forEach((col) => {
    model += `  validates :${col.name}, presence: true\n`;
  });
  model += `end\n`;
  return model;
};

// Generate PHP model (Laravel)
const generatePHPModel = (tableName, columns) => {
  let model = `use Illuminate\Database\Eloquent\Model;\n\nclass ${tableName} extends Model {\n`;
  model += `    protected $fillable = [${columns
    .map((col) => `'${col.name}'`)
    .join(", ")}];\n}\n`;
  return model;
};

// Generate Go model
const generateGoModel = (tableName, columns) => {
  let model = `type ${tableName} struct {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToGo(col.type);
    model += `    ${col.name} ${fieldType} \`json:"${col.name}"\`\n`;
  });
  model += `}\n`;
  return model;
};

// Generate Kotlin model
const generateKotlinModel = (tableName, columns) => {
  let model = `data class ${tableName}(\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToKotlin(col.type);
    model += `    val ${col.name}: ${fieldType},\n`;
  });
  model += `)\n`;
  return model;
};

// Generate Swift model
const generateSwiftModel = (tableName, columns) => {
  let model = `struct ${tableName} {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToSwift(col.type);
    model += `    var ${col.name}: ${fieldType}\n`;
  });
  model += `}\n`;
  return model;
};

// Generate Rust model
const generateRustModel = (tableName, columns) => {
  let model = `struct ${tableName} {\n`;
  columns.forEach((col) => {
    const fieldType = mapSQLTypeToRust(col.type);
    model += `    ${col.name}: ${fieldType},\n`;
  });
  model += `}\n`;
  return model;
};

// Mapping SQL type to Python type
const mapSQLTypeToPython = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "int";
    case "VARCHAR":
      return "str";
    case "TIMESTAMP":
      return "str"; // Or datetime
    default:
      return "str";
  }
};

// Mapping SQL type to JS type
const mapSQLTypeToJS = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "Number";
    case "VARCHAR":
      return "String";
    case "TIMESTAMP":
      return "Date";
    default:
      return "String";
  }
};

// Mapping SQL type to TypeScript type
const mapSQLTypeToTS = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "number";
    case "VARCHAR":
      return "string";
    case "TIMESTAMP":
      return "string"; // or Date
    default:
      return "string";
  }
};

// Mapping SQL type to Java type
const mapSQLTypeToJava = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "int";
    case "VARCHAR":
      return "String";
    case "TIMESTAMP":
      return "java.util.Date";
    default:
      return "String";
  }
};

// Mapping SQL type to C# type
const mapSQLTypeToCSharp = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "int";
    case "VARCHAR":
      return "string";
    case "TIMESTAMP":
      return "DateTime";
    default:
      return "string";
  }
};

// Mapping SQL type to Go type
const mapSQLTypeToGo = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "int";
    case "VARCHAR":
      return "string";
    case "TIMESTAMP":
      return "string"; // or time.Time
    default:
      return "string";
  }
};

// Mapping SQL type to Kotlin type
const mapSQLTypeToKotlin = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "Int";
    case "VARCHAR":
      return "String";
    case "TIMESTAMP":
      return "String"; // or Long
    default:
      return "String";
  }
};

// Mapping SQL type to Swift type
const mapSQLTypeToSwift = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "Int";
    case "VARCHAR":
      return "String";
    case "TIMESTAMP":
      return "String";
    default:
      return "String";
  }
};

// Mapping SQL type to Rust type
const mapSQLTypeToRust = (sqlType) => {
  switch (sqlType) {
    case "INT":
      return "i32";
    case "VARCHAR":
      return "String";
    case "TIMESTAMP":
      return "String"; // or chrono::DateTime
    default:
      return "String";
  }
};

export const POST = async (request) => {
  const { schema } = await request.json();
  console.log(schema);
  const models = await generateModelsFromSQL(schema);
  //   console.log(models);
  return NextResponse.json({ models }, { status: 200 });
};
