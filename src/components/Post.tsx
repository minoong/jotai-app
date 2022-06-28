import { atom, useAtom } from 'jotai'
import { useObservableState } from 'observable-hooks'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet-async'
import { useMutation } from 'react-query'
import { cookies, Todo, useCustomQuery } from '../hooks/useCustomQuery'
import useModal from '../hooks/useModal'
import ModalWrapper from './ModalWrapper'

export const todoAtom = atom<number>(1)

interface IPost {
 id: number
 contents: React.ReactNode
}

function Post() {
 //  console.log('alll', cookies.getAll())
 const [dataCookie, setDataCookie] = useCookies()
 const [count, setCount] = useState<number>(0)
 const [todo, setTodo] = useAtom(todoAtom)
 const { data, isFetched, refetch, isError, error, status } = useCustomQuery<Todo, number>(
  'todos',
  todo,
  'https://jsonplaceholder.typicode.com/posts',
  {
   onSettled(data, error) {
    console.log('settled', data, error)
    // handleOpenModal(<div>hsdalkfahsdlkfashflsd</div>)
   },
  },
 )

 const { handleOpenModal } = useModal()

 const handleRefetch = async () => {
  const a = await refetch()
 }

 const onClickModalButton = () => {
  handleOpenModal(null)
 }

 //  useEffect(() => {
 //   console.log('dataPost', data)
 //   handleOpenModal(<div>sfafd</div>)
 //  }, [data])

 //  useEffect(() => {
 //   console.log('todo', todo)
 //  }, [todo])

 console.log(data)

 return (
  <div>
   <Helmet>
    <title>hsdifhsidf</title>
   </Helmet>
   #############################################
   <pre>count : {count}</pre>
   <button onClick={handleRefetch}>REFETCH</button>
   <button onClick={() => setCount((prev) => prev + 1)}>^{count}^</button>
   <button onClick={() => setTodo((prev) => prev + 1)}>###{todo}###</button>
   data : [{data?.id}]<button onClick={onClickModalButton}>모달 보이기</button>
   <ModalWrapper />
  </div>
 )
}

export default Post
