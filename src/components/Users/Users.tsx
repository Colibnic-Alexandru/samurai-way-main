import React from "react";
import style from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/user.jpg"
import {UsersPropsType} from "./UsersContainer";

export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setUsersTotalCount(res.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)

    })}

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map(el => {
                        return <span className={this.props.currentPage === el ? style.selectedPage : ''}
                                     onClick={()=> {this.onPageChanged(el)}}>{el}</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={style.photo} src={u.photos?.small != null ? u.photos.small : userPhoto} alt=""/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {this.props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                </span>
                    </div>)
                }
            </div>
        )

    }
}

