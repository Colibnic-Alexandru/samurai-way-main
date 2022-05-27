import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validarors/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'}
                       component={Input} validate={[required]}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;