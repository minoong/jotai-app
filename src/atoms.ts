import { atom, PrimitiveAtom } from 'jotai'
import React from 'react'

export const nameAtom = atom('')
export const surnameAtom = atom('')

interface ModalAtomProps {
 isOpen: boolean
 contents: React.ReactNode
}

export const modalAtom = atom<ModalAtomProps>({
 isOpen: false,
 contents: null,
})

type NameItem = { name: string; surname: string }
export type NameItemAtom = PrimitiveAtom<NameItem>

const nameListAtom = atom<NameItemAtom[]>([])

const baseSelectedAtom = atom<NameItemAtom | null>(null)
export const selectedAtom = atom(
 (get) => get(baseSelectedAtom),
 (get, set, nameItemAtom: NameItemAtom | null) => {
  set(baseSelectedAtom, nameItemAtom)
  if (nameItemAtom) {
   const { name, surname } = get(nameItemAtom)
   set(nameAtom, name)
   set(surnameAtom, surname)
  }
 },
)

export const prefixAtom = atom('')

export const filteredNameListAtom = atom((get) => {
 const prefix = get(prefixAtom)
 const nameList = get(nameListAtom)
 if (!prefix) {
  return nameList
 }
 return nameList.filter((nameItemAtom) => get(nameItemAtom).surname.startsWith(prefix))
})

export const createAtom = atom(
 (get) => !!get(nameAtom) && !!get(surnameAtom),
 (get, set) => {
  const name = get(nameAtom)
  const surname = get(surnameAtom)
  if (name && surname) {
   const nameItemAtom: NameItemAtom = atom({ name, surname })
   set(nameListAtom, (prev) => [...prev, nameItemAtom])
   set(nameAtom, '')
   set(surnameAtom, '')
   set(selectedAtom, null)
  }
 },
)

export const updateAtom = atom(
 (get) => !!get(nameAtom) && !!get(surnameAtom) && !!get(selectedAtom),
 (get, set) => {
  const name = get(nameAtom)
  const surname = get(surnameAtom)
  const selected = get(selectedAtom)
  if (name && surname && selected) {
   set(selected, { name, surname })
  }
 },
)

export const deleteAtom = atom(
 (get) => !!get(selectedAtom),
 (get, set) => {
  const selected = get(selectedAtom)
  if (selected) {
   set(nameListAtom, (prev) => prev.filter((item) => item !== selected))
  }
 },
)
