import React, {useState, KeyboardEvent, ChangeEvent} from 'react';


type SpanInputPropsType = {
    title: string
    todoID: string
    callBack: (todoID: string, title: string)=>void
    fontSize: string
}
const SpanInputToMemo: React.FC<SpanInputPropsType> = ({todoID, title, callBack, fontSize}) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        setValue(val)
    }
    const onDoubleClick = () => {
        setEditMode(true)
    }
    const onSave = () => {
        if(value.match(/\w|\W/) ){
            callBack(todoID, value)
            setEditMode(false)
        } else {
            setValue(title)
            setEditMode(false)
        }

    }
    const onEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onSave()
    }

    return (
        <div>
            {
                editMode
                    ? <input
                        autoFocus
                        style={{textAlign: 'center',
                            width: '75%',
                            backgroundColor: '#6B7D93',
                            borderRadius: '5px'
                        }}
                        onChange={onChangeHandler}
                        value={value}
                        onKeyDown={onEnterPressed}
                        onBlur={onSave}/>
                    : <span style={{overflowWrap: 'anywhere',
                        fontSize: fontSize,
                        fontWeight: 'bold',
                        color: 'inherit',
                        textShadow: '2px 1px 2px rgba(69,131,153,0.64)'}} onDoubleClick={onDoubleClick}>{title}</span>
            }
        </div>
    );
};

export const SpanInput = React.memo(SpanInputToMemo)