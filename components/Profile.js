const Profile = () => {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        src='https://res.cloudinary.com/dzkbu5k0f/image/upload/v1673439027/295550837_150108040960987_1767449683352516642_n_eqy4wb.jpg'
        alt=''
        className='object-contain h-16 w-16 rounded-full border p-[2px]'
      />
      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>Rakaaaaannn</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
      </div>
      <button className='ml-10 text-blue-400 text-sm font-semibold'>
        Sign Out
      </button>
    </div>
  )
}

export default Profile
