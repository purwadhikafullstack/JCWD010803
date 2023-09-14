import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../avatar';
import React, { useState, useCallback } from 'react';
import MenuItem from './menu-item';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toLogin = () => {
    navigate('/login')
  }
  const toRegister = () => {
    navigate('/register')
  }
  const toDashboard = () => {
    navigate('/login-tenant')
  }

  return (
    
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
          onClick={toDashboard}
        >
          Cribs That Feel Like Home
        </div>
        <div 
        onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu/>
          <div className="hidden md:block">
            <Avatar/>
          </div>
        </div>
      </div>
      
    {isOpen && (
        <div
        className='
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-bg-secondary
        overflow-hidden
        right-0
        top-12
        text-sm
        '
        >
        <div className='flex flex-col cursor-pointer'>
            <>
                <MenuItem
                    onClick={toLogin}
                    label="Login"
                />
                <MenuItem
                    onClick={toRegister}
                    label="Sign up"
                />
            </>
        </div>
        </div>
    )}
      
    </div>
  );
}

export default UserMenu;
