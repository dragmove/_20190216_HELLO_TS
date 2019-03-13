import * as React from "react"
import TodoItem from "./TodoItem"
import Footer from "./Footer"
import { observer } from "mobx-react"

interface Props {
    store: any;
}

// props.store 로 store 가 주입되었다.
// view component 에서 store 의 actions 에 등록된 method 들을 직접 호출하고 있다.
export default observer(
    class MainSection extends React.Component<Props> {
        handleClearCompleted = () => {
            this.props.store.clearCompleted()
        }

        renderToggleAll() {
            const { store } = this.props
            if (store.todos.length > 0) {
                return (
                    <span>
                        {
                            // store 에 model, views, actions 로 선언한 모든 것에 접근 제약이 하나도 없는 듯 'ㅅ');

                            // store 의 view 메소드 getter 에 직접 접근함 // store.completedCount // model 을 기반으로 계산된 값
                            // store 의 todos model 변수에 직접 접근함 // store.todos.length
                            // store 의 actions 메소드를 직접 사용함 // store.completeAll() // 동작
                        }
                        <input
                            className="toggle-all"
                            id="toggle-all"
                            type="checkbox"
                            checked={store.completedCount === store.todos.length}
                            onChange={() => store.completeAll()}
                        />
                        <label htmlFor="toggle-all">Mark all as complete</label>
                    </span>
                )
            }
        }

        renderFooter(completedCount) {
            const { store } = this.props

            /// store 의 todos model 변수에 직접 접근함 // store.todos.length
            // props 로 주입 받은 store 를, 또 하위 컴포넌트인 Footer 로 주입
            if (store.todos.length) {
                return <Footer store={store} />
            }
        }

        render() {
            // TodoStore 의 view 메소드 getter filteredTodos 에 직접 접근함
            const { filteredTodos } = this.props.store

            return (
                <section className="main">
                    {this.renderToggleAll()}

                    <ul className="todo-list">
                        {
                            // TodoStore 의 filteredTodos 의 todo model 들을 <TodoItem> 컴포넌트에 주입
                        }
                        {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                    </ul>

                    {this.renderFooter()}
                </section>
            )
        }
    }
)