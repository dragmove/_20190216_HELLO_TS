import * as React from "react"
import classnames from "classnames"
import TodoTextInput from "./TodoTextInput"
import { observer } from "mobx-react"

interface Props {
    todo: any;
}

export default observer(
    class TodoItem extends React.Component<Props> {
        state = {
            editing: false
        }

        handleDoubleClick = () => {
            this.setState({ editing: true })
        }

        handleSave = (id: number, text: string) => {
            const { todo } = this.props
            if (text.length === 0) {
                todo.remove()
            } else {
                todo.edit(text)
            }
            this.setState({ editing: false })
        }

        render() {
            // TodoStore 의 todos 하위의 todo model 을 주입
            const { todo } = this.props

            let element
            if (this.state.editing) {
                element = (
                    <TodoTextInput
                        text={todo.text}
                        editing={this.state.editing}
                        onSave={(text: string) => this.handleSave(todo.id, text)}
                    />
                )
            } else {
                element = (
                    <div className="view">
                        {
                            // todo model 의 actions 메소드 호출하여 각 model 의 상태 변경
                        }
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => todo.complete()}
                        />
                        <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>

                        {
                            // todo model 의 actions 메소드 호출하여 TodoStore 의 removeTodo 메소드 호출
                            // model 의 parent 의 메소드를 호출한 예
                        }
                        <button className="destroy" onClick={() => todo.remove()} />
                    </div>
                )
            }

            return (
                <li
                    className={classnames({
                        completed: todo.completed,
                        editing: this.state.editing
                    })}
                >
                    {element}
                </li>
            )
        }
    }
)