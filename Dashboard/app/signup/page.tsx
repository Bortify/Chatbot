// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// const SignUpPage = () => {
//   return (
//     <section className='bg-gray-50 '>
//       <div className='flex flex-col items-center justify-center max-w-md px-6 py-8 mx-auto md:h-screen lg:py-0'>
//         <Link
//           href='/signup'
//           className='flex items-center mb-6 text-2xl font-semibold text-gray-900 '>
//           <Image
//             src='/295128.png'
//             alt='logo'
//             width={32}
//             height={32}
//             className='mr-2'
//           />
//           Signup
//         </Link>
//         <div className='w-full bg-white rounded-lg shadow '>
//           <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
//             <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
//               Create an account
//             </h1>
//             <form className='space-y-4 md:space-y-6' action='#'>
//               <InputField
//                 label='Your email'
//                 type='email'
//                 id='email'
//                 placeholder='name@company.com'
//                 required={true}
//               />
//               <InputField
//                 label='Password'
//                 type='password'
//                 id='password'
//                 placeholder='••••••••'
//                 required={true}
//               />
//               <InputField
//                 label='Confirm password'
//                 type='password'
//                 id='confirm-password'
//                 placeholder='••••••••'
//                 required={true}
//               />

//               <div className='flex items-start'>
//                 <div className='flex items-center h-5'>
//                   <input
//                     id='terms'
//                     aria-describedby='terms'
//                     type='checkbox'
//                     className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
//                     required={true}
//                   />
//                 </div>
//                 <div className='ml-3 text-sm'>
//                   <label htmlFor='terms' className='font-light text-gray-500 '>
//                     I accept the{' '}
//                     <Link
//                       className='font-medium text-primary-600 hover:underline '
//                       href='#'>
//                       Terms and Conditions
//                     </Link>
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type='submit'
//                 className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
//                 Create an account
//               </button>
//               <p className='text-sm font-light text-gray-500 '>
//                 Already have an account?{' '}
//                 <Link
//                   href='/login'
//                   className='font-medium text-primary-600 hover:underline '>
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SignUpPage
