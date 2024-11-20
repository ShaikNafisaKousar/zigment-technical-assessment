import React from 'react';
import { useForm } from 'react-hook-form';
import { JSONSchema, Field } from '../types';

interface FormPreviewProps {
  schema: JSONSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Submit data
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container p-4">
      <h2 className="text-center text-primary">{schema.formTitle}</h2>
      <p className="text-center text-muted mb-4">{schema.formDescription}</p>

      <div className="row">
        {schema.fields.map((field: Field) => {
          const { id, type, label, required, options, placeholder, validation } = field;

          return (
            <div key={id} className="col-12 col-md-6">
              <div className="mb-3">
                <label className="form-label" htmlFor={id}>
                  {label}
                  {required && <span className="text-danger"> *</span>}
                </label>

                {/* Text and Email Inputs */}
                {type === 'text' || type === 'email' || type === 'textarea' ? (
                  <input
                    {...register(id, {
                      required: required ? 'This field is required' : false,
                      pattern: validation ? { value: new RegExp(validation.pattern), message: validation.message } : undefined,
                    })}
                    type={type === 'email' ? 'email' : 'text'}
                    placeholder={placeholder}
                    id={id}
                    className="form-control"
                  />
                ) : null}

                {/* Select Input */}
                {type === 'select' ? (
                  <select
                    {...register(id, { required: required ? 'This field is required' : false })}
                    id={id}
                    className="form-select"
                  >
                    {options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}

                {/* Radio Input */}
                {type === 'radio' ? (
                  <div>
                    {options?.map(option => (
                      <div key={option.value} className="form-check form-check-inline">
                        <input
                          {...register(id, { required: 'This field is required' })}
                          type="radio"
                          id={option.value}
                          value={option.value}
                          className="form-check-input"
                        />
                        <label htmlFor={option.value} className="form-check-label">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Validation Error */}
                {errors[id] && (
                  <div className="text-danger mt-2">
                    {errors[id]?.message?.toString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default FormPreview;
