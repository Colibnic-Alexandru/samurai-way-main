import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validarors/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore";
import style from './../common/FormsControls/FormsControls.module.css';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type MapStatePropsType = {
    isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'}
                       component={Input} type={'password'} validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'}
                       component={Input} validate={[required]}/> remember me
            </div>
            {props.error && <div className={style.formSampleError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


const Login = (props: MapDispatchPropsType & MapStatePropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);