import React, { Component, KeyboardEvent, KeyboardEventHandler} from "react"
import classnames from "classnames"

interface Props {
    text: string;
    editing: boolean;
    newTodo: any; // TODO: define detail
    placeholder: string;
}

enum EventType {
    Mouse,
    Keyboard
}

interface Event { timestamp: number; }
interface KeyEvent extends Event {
    target: any;
}

export default class TodoTextInput extends Component<Props> {
    state = {
        text: this.props.text || ""
    }

    handleSubmit: KeyboardEventHandler = (e: KeyboardEvent) => {
        const text = e.target.value.trim()
        
        if (e.which === 13) {
            this.props.onSave(text)

            if (this.props.newTodo) {
                this.setState({ text: "" })
            }
        }
    }

    handleChange = (e:KeyboardEvent)  => {
        this.setState({ text: e.target.value })
    }

    handleBlur = e => {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value)
        }
    }

    render() {
        return (
            <input
                className={classnames({
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