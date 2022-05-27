import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validarors/validators";

export type FormDataType = {
    newMessageText: string
}

const maxLength = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea}
                        name={'newMessageText'}
                        placeholder={'Enter message'}
                        validate={[required, maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)