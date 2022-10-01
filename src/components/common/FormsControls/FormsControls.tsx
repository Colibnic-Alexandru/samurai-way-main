import React from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...restProps}) => {

    return (
        <FormControl meta={meta}> <textarea {...input} {...restProps}/> </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...restProps}) => {
    return (
        <FormControl meta={meta}> <input {...input} {...restProps}/> </FormControl>
    )
}

export const createField = (placeholder: string | null, name: string,
                            validators: ((value: string) => string | undefined)[],
                            component: React.FC<WrappedFieldProps>, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)