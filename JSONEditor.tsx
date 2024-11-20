import React, { useState } from 'react';

interface JSONEditorProps {
  onSchemaChange: (schema: string) => void;
  error: string | null;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onSchemaChange, error }) => {
  const [schemaInput, setSchemaInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setSchemaInput(newValue);
    onSchemaChange(newValue);
  };

  return (
    <div className="editor-container">
      <h2 className="text-center text-primary mb-4">JSON Schema Editor</h2>
      <textarea
        value={schemaInput}
        onChange={handleChange}
        className="form-control mb-3"
        placeholder="Enter JSON schema here"
        rows={15}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default JSONEditor;