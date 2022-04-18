import React from "react";
import {UsersPropsType} from "./UsersContainer";
import style from "./Users.module.css";

export function Users(props: UsersPropsType) {
    if (props.usersPage.users.length === 0) {
        props.setUsers([{
            id: 1,
            fullName: 'Alex',
            status: 'I am a developer',
            photoURL: 'https://xakep.ru/wp-content/uploads/2014/09/shaka-nevedimka.jpg',
            followed: true,
            location: {
                city: 'Chisinau',
                country: 'Moldova'
            }
        },
            {
                id: 2,
                fullName: 'Dima',
                status: 'I am a developer',
                photoURL: 'https://kartinkin.net/uploads/posts/2022-02/1644934121_68-kartinkin-net-p-kartinki-dlya-stima-70.jpg',
                followed: false,
                location: {
                    city: 'Chisinau',
                    country: 'Moldova'
                }
            },
            {
                id: 3,
                fullName: 'Vlad',
                status: 'I am a developer',
                photoURL: 'https://pixelbox.ru/wp-content/uploads/2021/09/avatar-boys-vk-98.jpgk',
                followed: true,
                location: {
                    city: 'Chisinau',
                    country: 'Moldova'
                }
            },

        ]);
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={style.photo} src={u.photoURL} alt=""/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.city}</div>
                            <div>{u.location.country}</div>
                        </span>
                </span>
                </div>)
            }
        </div>
    )
}

