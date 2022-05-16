import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export const Header = (props: PropsType) => {
    console.log(props.login)
    return <header className={s.header}>
        <img src='https://weblinks.ru/wp-content/uploads/2021/02/fffatewx.jpeg' alt={''}/>

        <div className={s.loginBlock}>
            {props.isAuth && props.login?.length
                ? <div>
                    {props.login}
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}
