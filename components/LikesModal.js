import { likesModalState } from '@/atoms/likesModalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRecoilState } from 'recoil'

const LikesModal = ({ likes }) => {
  const [showLikesModal, setShowLikesModal] = useRecoilState(likesModalState)
  return (
    <Transition.Root show={showLikesModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-40 inset-0 overflow-y-auto'
        onClose={setShowLikesModal}
      >
        <div className='flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='w-full inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:p-6'>
              <div className='flex flex-col items-center'>
                <div className='w-full flex items-center justify-between'>
                  <p className='font-medium text-sm'>LIKED BY </p>
                  <p className='text-sm text-gray-400'>
                    {likes.length}
                    {likes.length === 1 ? ' like' : ' likes'}
                  </p>
                </div>
                <hr className='mt-1 w-full' />
                <div className='w-full flex flex-col py-3 items-center space-y-5'>
                  {likes.map((like) => (
                    <div
                      key={like.id}
                      className='flex items-center space-x-2 w-full'
                    >
                      <img
                        src={like.data().profileImage}
                        alt=''
                        className='h-12 w-12 rounded-full object-contain'
                      />
                      <div className='flex flex-1 flex-col'>
                        <p className='text-sm font-medium'>
                          {like.data().username}
                        </p>
                        <p className='text-sm text-gray-400'>
                          {like.data().name}
                        </p>
                      </div>
                      <p className='bg-blue-500 text-white flex items-center justify-center h-fit px-6 py-1 rounded-xl cursor-pointer'>
                        Follow
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LikesModal
