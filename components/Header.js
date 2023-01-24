import Image from 'next/image'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Header = ({ inLogIn }) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
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
                onClick={() => setIsOpen(true)}
                className='headerIcon'
              />
              <HeartIcon className='headerIcon' />
              <div className='relative'>
                <PaperAirplaneIcon className='headerIcon -rotate-45' />
                <div className='absolute -top-1 -right-2 text-xs h-5 w-5 bg-red-500 rounded-full justify-center flex items-center text-white animate-pulse'>
                  3
                </div>
              </div>
              <Menu>
                <Menu.Button>
                  <img
                    src={session.user.image}
                    alt='user image'
                    className='h-11 w-11 object-fit rounded-full cursor-pointer'
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-30 top-12 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-gray-200' : 'text-gray-900'
                          } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                        >
                          <img
                            src={session.user.image}
                            className='h-11 w-11 object-fit rounded-full cursor-pointer'
                          />
                          <p>{session.user.username}</p>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-gray-200' : 'text-gray-900'
                          } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                          onClick={signOut}
                        >
                          <ArrowRightOnRectangleIcon className='h-10 w-10 p-2 bg-gray-200 rounded-full' />
                          <p>Log Out</p>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* <img
                onClick={signOut}
                src={session.user.image}
                className='h-11 w-11 object-fit rounded-full cursor-pointer'
                alt='profile'
              /> */}
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
