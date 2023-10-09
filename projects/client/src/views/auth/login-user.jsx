import FormLoginUser from '../../components/user/form-login-user';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { FireBaseLogin } from '../../components/user/login-firebase';
import { useInView } from "react-intersection-observer";

export const LoginUser = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/forgot-password')
  }
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const toRegis = () => {
    navigate("/register")
  }

  return (

    <div className=' flex h-screen min-w-full justify-end'>
      <div className=' bg-center w-screen hidden sm:block bg-[url(https://source.unsplash.com/random?hotel)] bg-no-repeat bg-cover ' ></div>
      <div className=' w-full sm:w-2/3 flex text-2xl font-sans'>
        <div className='w-full shadow-lg px-5 pt-32'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 1000 }}
            transition={{ duration: 0.7 }}
            className='w-full'
          >
            <div className='flex justify-center min-w-max text-gray-600'>
              Sign in
            </div>
            <div>
              <FormLoginUser />
            </div>
            <div> <FireBaseLogin buttonText={"Sign In With Google"}/> </div>

            <div className='flex mt-5 underline text-gray-500  w-full justify-between text-sm'>
              <div className='cursor-pointer' onClick={handleClick}>Forgot password?</div>
              <div onClick={toRegis} className='cursor-pointer'>Don't have an account? Sign Up</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}      
