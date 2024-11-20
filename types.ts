export interface JSONSchema {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  }
  
  export interface Field {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: { pattern: string; message: string };
  }
  export {}