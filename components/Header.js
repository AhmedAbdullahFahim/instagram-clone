import Image from 'next/image'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'

const Header = () => {
  return (
    <div className='shadow-sm sticky top-0 z-50 border-b bg-white'>
      <div className='max-w-6xl flex justify-between mx-5 lg:mx-auto py-2 sm:py-0 items-center'>
        <div className='relative hidden md:inline-grid h-10 w-24 cursor-pointer'>
          <Image
            src='https://links.papareact.com/ocw'
            fill
            className='object-contain'
            alt='instagram'
          />
        </div>
        <div className='relative h-8 md:hidden w-10 flex-shrink-0 cursor-pointer'>
          <Image
            src='https://links.papareact.com/jjm'
            fill
            className='object-contain'
            alt='logo'
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
          <HomeIcon className='headerIcon mr-1' />
          <div className='relative'>
            <PaperAirplaneIcon className='headerIcon -rotate-45' />
            <div className='absolute -top-1 -right-2 text-xs h-5 w-5 bg-red-500 rounded-full justify-center flex items-center text-white animate-pulse'>
              3
            </div>
          </div>
          <PlusCircleIcon className='headerIcon' />
          <UserGroupIcon className='headerIcon' />
          <HeartIcon className='headerIcon' />
          {/* <Bars3Icon className='flex md:hidden headerIcon' /> */}
          <img
            src='/295550837_150108040960987_1767449683352516642_n.jpg'
            className='h-11 object-fit rounded-full cursor-pointer'
            alt='profile'
          />
        </div>
      </div>
    </div>
  )
}

export default Header
