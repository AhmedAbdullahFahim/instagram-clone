import Image from 'next/image'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import DropdownMenu from './DropdownMenu'
import { deleteModalState } from '@/atoms/deleteModalAtom'
import { likesModalState } from '@/atoms/likesModalAtom'

const Header = ({ inLogIn }) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(deleteModalState)
  const [openLikesModal, setOpenLikesModal] = useRecoilState(likesModalState)
  const router = useRouter()
  return (
    <div className='shadow-sm sticky top-0 z-30 border-b bg-white'>
      <div className='max-w-6xl flex justify-between mx-5 lg:mx-auto py-2 sm:py-0 items-center'>
        <div
          onClick={() => router.push('/')}
          className='relative inline-grid h-10 w-24 cursor-pointer'
        >
          <Image
            src='https://links.papareact.com/ocw'
            fill
            className='object-contain'
            alt='instagram'
          />
        </div>
        <div className='hidden sm:inline-flex max-w-sm'>
          <div className='relative p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              type='text'
              className='bg-gray-50 block w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md pl-10 md:pr-20 sm:pr-0'
              placeholder='Search'
            />
          </div>
        </div>
        <div className='flex items-center justify-end space-x-4'>
          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => {
                  setIsOpen(true)
                  setOpenDeleteModal(false)
                  setOpenLikesModal(false)
                }}
                className='headerIcon'
              />
              <HeartIcon className='headerIcon' />
              <div className='relative'>
                <PaperAirplaneIcon className='headerIcon -rotate-45' />
                <div className='absolute -top-1 -right-2 text-xs h-5 w-5 bg-red-500 rounded-full justify-center flex items-center text-white animate-pulse'>
                  3
                </div>
              </div>
              <DropdownMenu
                image={session.user.image}
                username={session.user.username}
              />
            </>
          ) : (
            !inLogIn && (
              <button className='font-semibold' onClick={signIn}>
                Sign In
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
