import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {ProfilePageType} from "../../../redux/reducerProfilePage";


const ProfileDataForm = (props: InjectedFormProps<ProfilePageType>) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <button onClick={()=> {}}>Save</button>
        </div>
        <div>
            <b>Full name: </b> {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking For A Job: </b> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>

        <div>
            <b>My professional
                skills: </b> {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me: </b> {createField('About me', 'aboutMe', [], Textarea)}
        </div>
       {/* <div>
            <b>Contacts: </b> {Object.keys(initialValues.contacts ?? {}).map(key => {
            return <div key={key}>
                <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
            </div>
        })}
        </div>*/}
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfilePageType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;