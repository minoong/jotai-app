// import React, { FormEvent, Suspense, useState } from 'react'
// import logo from './logo.svg'
// import './App.css'
// import { atom, PrimitiveAtom, Provider, useAtom, useAtomValue, useSetAtom } from 'jotai'
// import { CloseOutlined } from '@ant-design/icons'
// import { Radio } from 'antd'
// import { a, useTransition } from '@react-spring/web'

// const delay = (ms: number) => {
//  return new Promise((resolve) =>
//   setTimeout(() => {
//    resolve(ms)
//   }, ms),
//  )
// }

// const countAtom = atom(1)
// const asyncAtom = atom(async (get) => {
//  const result = await delay(5000)
//  return get(countAtom) * 2
// })

// function ComponentUsingAsyncAtom() {
//  const value = useAtomValue(asyncAtom)

//  return <div>{value}</div>
// }

// type Todo = {
//  title: string
//  completed: boolean
// }

// const filterAtom = atom('all')
// const todosAtom = atom<PrimitiveAtom<Todo>[]>([])
// const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
//  const filter = get(filterAtom)
//  const todos = get(todosAtom)

//  if (filter === 'all') return todos
//  else if (filter === 'completed') return todos.filter((atom) => get(atom).completed)
//  else return todos.filter((atom) => !get(atom).completed)
// })

// type RemoveFn = (item: PrimitiveAtom<Todo>) => void
// type TodoItemProps = {
//  atom: PrimitiveAtom<Todo>
//  remove: RemoveFn
// }

// const TodoItem = ({ atom, remove }: TodoItemProps) => {
//  const [item, setItem] = useAtom(atom)
//  const toggleCompleted = () => setItem((props) => ({ ...props, completed: !props.completed }))

//  return (
//   <>
//    <input type="checkbox" checked={item.completed} onChange={toggleCompleted} />
//    <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>{item.title}</span>
//    <CloseOutlined onClick={() => remove(atom)} />
//   </>
//  )
// }

// const Filter = () => {
//  const [filter, set] = useAtom(filterAtom)

//  return (
//   <Radio.Group onChange={(e) => set(e.target.value)} value={filter}>
//    <Radio value="all">All</Radio>
//    <Radio value="completed">Completed</Radio>
//    <Radio value="incompleted">Incompleted</Radio>
//   </Radio.Group>
//  )
// }

// type FilteredType = {
//  remove: RemoveFn
// }
// const Filtered = (props: FilteredType) => {
//  const [todos] = useAtom(filteredAtom)
//  const transitions = useTransition(todos, {
//   keys: (todo) => todo.toString(),
//   from: { opacity: 0, height: 0 },
//   enter: { opacity: 1, height: 40 },
//   leave: { opacity: 0, height: 0 },
//  })
//  return transitions((style, atom) => (
//   <a.div className="item" style={style}>
//    <TodoItem atom={atom} {...props} />
//   </a.div>
//  ))
// }

// const TodoList = () => {
//  const setTodos = useSetAtom(todosAtom)

//  const remove: RemoveFn = (todo) => setTodos((prev) => prev.filter((item) => item !== todo))

//  const add = (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault()
//   const title = e.currentTarget.inputTitle.value
//   e.currentTarget.inputTitle.value = ''
//   setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
//  }

//  return (
//   <form onSubmit={add}>
//    <Filter />
//    <input name="inputTitle" placeholder="Type ..." />
//    <Filtered remove={remove} />
//   </form>
//  )
// }

// function App() {
//  return (
//   <Provider>
//    <h1>Jōtai</h1>
//    <TodoList />
//    <Suspense fallback={<div>dsfjs2312312zdlk2jflk</div>}>
//     <ComponentUsingAsyncAtom />
//    </Suspense>
//   </Provider>
//  )
// }

// export default App

import { Suspense, useEffect, useMemo, useState } from 'react'
import { atom, useAtom } from 'jotai'
import Modal from 'react-modal'
import './index.css'
import {
 NameItemAtom,
 nameAtom,
 surnameAtom,
 prefixAtom,
 filteredNameListAtom,
 selectedAtom,
 createAtom,
 updateAtom,
 deleteAtom,
} from './atoms'
import { Todo, useCustomQuery } from './hooks/useCustomQuery'
import Post, { todoAtom } from './components/Post'
import { Link, Route, Routes } from 'react-router-dom'
import Test from './components/Test'
import { useToast } from './toast/ToastProvider'

const customStyles = {
 overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
 },
 content: {
  position: 'absolute',
  top: '40px',
  left: '40px',
  right: '40px',
  bottom: '40px',
  border: '1px solid #ccc',
  background: '#fff',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px',
 },
}

function ModalContentFirst() {
 return <div>ModalContentFirst</div>
}
function ModalContentSecond() {
 return <div>ModalContentSecond</div>
}

const ModalType = {
 first: <ModalContentFirst />,
 second: <ModalContentSecond />,
}

Modal.setAppElement('#root')

const Filter = () => {
 const [prefix, setPrefix] = useAtom(prefixAtom)
 return (
  <div>
   <span>Filter prefix:</span>
   <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
  </div>
 )
}

const Item = ({ itemAtom }: { itemAtom: NameItemAtom }) => {
 const [{ name, surname }] = useAtom(itemAtom)
 const [selected, setSelected] = useAtom(
  useMemo(
   () =>
    atom(
     (get) => get(selectedAtom) === itemAtom,
     (_get, set) => set(selectedAtom, itemAtom),
    ),
   [itemAtom],
  ),
 )
 return (
  <div
   style={{
    padding: '0.1em',
    backgroundColor: selected ? 'lightgray' : 'transparent',
   }}
   onClick={setSelected}
  >
   {name}, {surname}
  </div>
 )
}

const List = () => {
 const [list] = useAtom(filteredNameListAtom)
 return (
  <div
   style={{
    width: '100%',
    height: '8em',
    overflow: 'scroll',
    border: '2px solid gray',
   }}
  >
   {list.map((item) => (
    <Item key={String(item)} itemAtom={item} />
   ))}
  </div>
 )
}

const NameField = () => {
 const [name, setName] = useAtom(nameAtom)
 return (
  <div>
   <span>Name:</span>
   <input value={name} onChange={(e) => setName(e.target.value)} />
  </div>
 )
}

const SurnameField = () => {
 const [surname, setSurname] = useAtom(surnameAtom)
 return (
  <div>
   <span>Surname:</span>
   <input value={surname} onChange={(e) => setSurname(e.target.value)} />
  </div>
 )
}

const CreateButton = () => {
 const [enabled, create] = useAtom(createAtom)
 return (
  <button disabled={!enabled} onClick={create}>
   Create
  </button>
 )
}

const UpdateButton = () => {
 const [enabled, update] = useAtom(updateAtom)
 return (
  <button disabled={!enabled} onClick={update}>
   Update
  </button>
 )
}

const DeleteButton = () => {
 const [enabled, del] = useAtom(deleteAtom)
 return (
  <button disabled={!enabled} onClick={del}>
   Delete
  </button>
 )
}

const App = () => {
 let subtitle: HTMLHeadingElement | null
 const [modalIsOpen, setIsOpen] = useState(false)

 function openModal(type: keyof typeof ModalType) {
  setIsOpen(true)
  setModalType(type)
 }

 function closeModal() {
  setModalType(null)
  setIsOpen(false)
 }
 const [todo, setTodo] = useAtom(todoAtom)
 const [modalType, setModalType] = useState<keyof typeof ModalType | null>(null)
 const toast = useToast()

 const teste = () => {
  toast?.push('위치 설정 완료.', 'Info', 5700)
 }

 const { data, isFetched, refetch, isError, error, status } = useCustomQuery<Todo, number>(
  'todos',
  todo,
  'https://jsonplaceholder.typicode.com/posts',
  {
   onSettled(data, error) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@', error)
   },
  },
 )

 useEffect(() => {
  console.log('dataApp', data)
 }, [data])

 return (
  <div className="App bg-zinc-700">
   <button onClick={() => openModal('first')} className="text-red-700">
    Open Modal FIRST
   </button>
   <button onClick={() => openModal('second')} className="text-red-700">
    Open Modal second
   </button>
   <button onClick={() => teste()} className="text-red-700">
    Open Modal
   </button>
   <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
    <div>
     {modalType && ModalType[modalType]}
     <Post />
    </div>
   </Modal>
   <div id="snackbar">Some text some message..</div>
   <div style={{ display: 'flex' }}>
    <div style={{ width: '45%' }}>
     <Filter />
     <List />
    </div>
    <div style={{ width: '45%', margin: 'auto' }}>
     <NameField />
     <SurnameField />
    </div>
   </div>
   <CreateButton />
   <UpdateButton />
   <DeleteButton />
   <button onClick={() => setTodo((prev) => prev + 1)}>zzrefetch {todo}</button>
   <Link to="/home">HOME</Link>
   <Link to="/post">post</Link>
   <Link to="/test">test</Link>
   {data?.id}################
   <Routes>
    <Route
     path="post"
     element={
      <Suspense fallback={<div>dddfsjadkflasjdflsk</div>}>
       <Post />
      </Suspense>
     }
    />
    <Route
     path="test"
     element={
      <Suspense fallback={<div>dddfsjadkflasjdflsk</div>}>
       <Test />
      </Suspense>
     }
    />
   </Routes>
  </div>
 )
}

export default App
