const Story = ({ username, img }) => {
  return (
    <div>
      <img
        src={img}
        alt='story'
        className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain transition transform hover:scale-110 duration-150 ease-out cursor-pointer'
      />
      <p className='text-xs w-14 text-center truncate'>{username}</p>
    </div>
  )
}

export default Story
