import { db, storage } from '@/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage'
import { modalState } from '@/atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { CameraIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { deleteModalState } from '@/atoms/deleteModalAtom'
import { likesModalState } from '@/atoms/likesModalAtom'

const Modal = ({ likes, postId }) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(deleteModalState)
  const [openLikesModal, setOpenLikesModal] = useRecoilState(likesModalState)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      email: session.user.email,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        })
      }
    )
    setIsOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const deletePost = async (id) => {
    await deleteDoc(doc(db, 'posts', id))
    const imageRef = ref(storage, `posts/${postId}/image`)
    await deleteObject(imageRef)
    setIsOpen(false)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-40 inset-0 overflow-y-auto'
        onClose={setIsOpen}
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
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              {!openDeleteModal && !openLikesModal && (
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt=''
                      onClick={() => setSelectedFile(null)}
                      className='w-full object-contain cursor-pointer'
                    />
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                    >
                      <CameraIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                      />
                    </div>
                  )}
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Upload a photo
                      </Dialog.Title>
                      <div>
                        <input
                          ref={filePickerRef}
                          type='file'
                          hidden
                          onChange={addImageToPost}
                        />
                      </div>
                      <div className='mt-2'>
                        <input
                          type='text'
                          className='border-none focus:ring-0 w-full text-center'
                          ref={captionRef}
                          placeholder='Enter a caption for your post...'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      disabled={!selectedFile || loading}
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-blue-400 disabled:cursor-not-allowed hover:disabled:bg-blue-400'
                      onClick={uploadPost}
                    >
                      {loading ? 'Loading...' : 'Upload Post'}
                    </button>
                  </div>
                </div>
              )}
              {openDeleteModal && (
                <div className='flex flex-col items-start p-3 sm:p-0 space-y-5'>
                  <h1 className='font-bold text-sm sm:text-md'>Delete Post?</h1>
                  <p className='font-medium text-sm sm:text-md'>
                    Are you sure you want to delete this post?
                  </p>
                  <div className='w-full flex items-center justify-evenly space-x-5'>
                    <button
                      onClick={() => deletePost(postId)}
                      className='modalButton bg-red-600 hover:bg-red-700'
                    >
                      Delete
                    </button>
                    <button
                      className='modalButton'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {openLikesModal && (
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
                          <p className='text-xs sm:text-sm font-medium'>
                            {like.data().username}
                          </p>
                          <p className='text-xs sm:text-sm text-gray-400'>
                            {like.data().name}
                          </p>
                        </div>
                        <button className='modalButton'>Follow</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
