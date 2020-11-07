import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import IInputFormData from './FormProps/IInputFormProps';

const InputForm: React.FC<IInputFormData> = ({name, label, errorObj, autoFocus = false, 
    required = false, type="text"}) => {

    const { control } = useFormContext();
    let isError: boolean = false;
    let errorMessage: string = "";
    if(errorObj.hasOwnProperty(name))
    {
        isError = true;
        errorMessage = errorObj[name].message;
    }

    return(
        <Controller 
            as={TextField}
            type={type}
            margin="dense"
            autoFocus={autoFocus}
            name={name}
            control={control}
            defaultValue=""
            label={label}
            fullWidth={true}
            error={isError}
            InputLabelProps={{
                required: required
            }}
            helperText={errorMessage}
        />
    )
}

export default InputForm;