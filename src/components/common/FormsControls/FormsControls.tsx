import React from 'react';
import style from './FormsControls.module.css'

type FormsControlsPropsType = {
    input: any
    meta: any
}

export const Textarea: React.FC<FormsControlsPropsType> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error: "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const Input: React.FC<FormsControlsPropsType> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error: "")}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

