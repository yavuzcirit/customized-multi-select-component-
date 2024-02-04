import React, { ReactComponentElement } from 'react'
import './modal.scss'

interface IModal {
    children: any;
    isOpen: boolean;
}

const Modal = ({children,isOpen}: IModal ) => {
  return (
    <div className='modal'>
        {isOpen && children}
    </div>
  )
}

export default Modal