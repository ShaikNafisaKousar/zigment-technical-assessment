import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';
import { JSONSchema } from './types';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<JSONSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSchemaChange = (newSchema: string) => {
    try {
      const parsedSchema = JSON.parse(newSchema);
      setJsonSchema(parsedSchema);
      setError(null);
    } catch (e) {
      setError('Invalid JSON Schema');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 space-x-4">
      <div className="flex-1">
        <JSONEditor onSchemaChange={handleSchemaChange} error={error} />
      </div>
      <div className="flex-1 overflow-auto">
        {jsonSchema ? (
          <FormPreview schema={jsonSchema} />
        ) : (
          <div className="text-gray-500">Please enter a valid JSON schema to generate the form.</div>
        )}
      </div>
    </div>
  );
};

export default App;