import React from "react"
import Header from "../components/Header"
import MainSection from "../components/MainSection"

type AppProps = {
    store: any
}

const App = ({ store }: AppProps) => (
    <div>
        {
            // Header 내부의 하위 컴포넌트부터 입력된 UI 조작으로 store 에 직접 action method 를 호출하고 있다.
        }
        <Header addTodo={store.addTodo} />

        {
            // MainSection 에 store 를 주입한다.
        }
        <MainSection store={store} />
    </div>
)

export default App;