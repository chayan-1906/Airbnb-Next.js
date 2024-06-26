'use client';

import {useCallback, useEffect, useState} from "react";
import {IoMdClose} from "react-icons/io";
import Button from "@/app/components/Button";

function Modal({isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel}) {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div className={'flex fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'}>
                <div className={'relative flex flex-col w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto justify-center'}>
                    {/** content */}
                    <div className={`translate duration-1000 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        <div className={'flex flex-col w-full bg-white translate h-full md:max-h-[90vh] border-0 rounded-xl shadow-lg relative outline-none focus:outline-none'}>
                            {/** header */}
                            <div className={'flex relative items-center justify-center p-5 rounded-t border-b-[1px]'}>
                                <button onClick={onClose} className={'p-1 border-0 hover:opacity-70 transition absolute left-9'}>
                                    <IoMdClose size={18}/>
                                </button>
                                <div className={'text-lg font-semibold'}>{title}</div>
                            </div>

                            {/** body & footer */}
                            <div className={'overflow-x-hidden overflow-y-auto'}>
                                {/** body */}
                                <div className={'relative px-6 py-4 flex-auto rounded-xl'}>{body}</div>

                                {/** footer */}
                                <div className={'flex flex-col gap-2 p-6'}>
                                    <div className={'flex flex-row items-center gap-4 w-full'}>
                                        {
                                            secondaryAction && secondaryActionLabel && (
                                                <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction}/>
                                            )
                                        }
                                        <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}/>
                                    </div>
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
