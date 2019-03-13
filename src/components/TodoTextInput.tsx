import React, { Component, ReactNode, KeyboardEvent, FocusEvent, ChangeEvent} from "react"
const classNames = require("classnames");

interface Props {
    text?: string;
    editing?: boolean;
    newTodo?: any; // TODO: define detail
    placeholder?: string;
    onSave?: any; // TODO: define detail
}

interface State {
    text: string;
}

export default class TodoTextInput extends Component<Props, State> {
    state: State = {
        text: this.props.text || ''
    }

    handleSubmit = (evt: KeyboardEvent<HTMLInputElement>): void => {
        const target = evt.target as HTMLInputElement;
        const text: string = target.value.trim();
        
        if (evt.which === 13) {
            this.props.onSave(text)

            if (this.props.newTodo) {
                this.setState({ text: '' })
            }
        }
    }

    handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: evt.target.value })
    }

    handleBlur = (evt: FocusEvent<HTMLInputElement>): void => {
        if (!this.props.newTodo) {
            this.props.onSave(evt.target.value)
        }
    }

    render(): ReactNode {
        return (
            <input
                className={classNames({
                    edit: this.props.editing,
                    "new-todo": this.props.newTodo
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        )
    }
}