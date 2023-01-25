import { deleteModalState } from '@/atoms/deleteModalAtom'
import { likesModalState } from '@/atoms/likesModalAtom'
import { modalState } from '@/atoms/modalAtom'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  EllipsisVerticalIcon,
  StarIcon,
  TrashIcon,
  UserMinusIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useRecoilState } from 'recoil'

const DropdownMenu = ({ image, username, id, email, setPostId }) => {
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(deleteModalState)
  const [openLikesModal, setOpenLikesModal] = useRecoilState(likesModalState)
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const { data: session } = useSession()
  return (
    <Menu>
      <Menu.Button>
        {image ? (
          <img
            src={image}
            alt='user image'
            className='h-11 w-11 object-fit rounded-full cursor-pointer'
          />
        ) : (
          <EllipsisVerticalIcon className='h-7 cursor-pointer' />
        )}
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
        {image ? (
          <Menu.Items className='absolute right-30 top-12 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-gray-200' : 'text-gray-900'
                  } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                >
                  <img
                    src={image}
                    className='h-11 w-11 object-fit rounded-full cursor-pointer'
                  />
                  <p>{username}</p>
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
                  <ArrowRightOnRectangleIcon className='h-10 w-10 p-2 rounded-full' />
                  <p>Log Out</p>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        ) : (
          <Menu.Items className='absolute right-5 top-12 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-gray-200' : 'text-gray-900'
                  } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                >
                  <StarIcon className='h-10 w-10 p-2 rounded-full' />
                  <p>Add to favourites</p>
                </div>
              )}
            </Menu.Item>
            {session.user.email === email && (
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      setIsOpen(true)
                      setOpenDeleteModal(true)
                      setOpenLikesModal(false)
                      setPostId(id)
                    }}
                    className={`${
                      active ? 'bg-gray-200' : 'text-gray-900'
                    } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                  >
                    <TrashIcon className='h-10 w-10 p-2 rounded-full' />
                    <p>Delete post</p>
                  </div>
                )}
              </Menu.Item>
            )}
            {session.user.email !== email && (
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-gray-200' : 'text-gray-900'
                    } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                  >
                    <UserMinusIcon className='h-10 w-10 p-2 rounded-full' />
                    <p>Unfollow</p>
                  </div>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-gray-200' : 'text-gray-900'
                  } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                >
                  <BookmarkIcon className='h-10 w-10 p-2 rounded-full' />
                  <p>Save Post</p>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
