'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

function LoginModal() {
    let router = useRouter();
    let registerModal = useRegisterModal();
    let loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    let {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback?.error);
            }
        });
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading title={'Welcome back'} subtitle={'Login to your account!'}/>
            <Input id={'email'} label={'Email'} type={'email'} disabled={isLoading} register={register} errors={errors} required/>
            <Input id={'password'} label={'Password'} type={'password'} disabled={isLoading} register={register} errors={errors} required/>
        </div>
    );

    const footerContent = (
        <div className={'flex flex-col gap-4 mt-3'}>
            <div className={'flex items-center gap-4 text-zinc-600'}>
                <hr className={'flex-1'}/>
                or
                <hr className={'flex-1'}/>
            </div>
            <Button outline label={'Continue with Google'} icon={FcGoogle} onClick={() => {signIn('google')}}/>
            <Button outline label={'Continue with Github'} icon={AiFillGithub} onClick={() => signIn('github')}/>
            <div className={'text-neutral-500 text-center mt-4 font-light'}>
                <div className={'flex justify-center items-center gap-2'}>
                    <div>First time using Airbnb?</div>
                    <div onClick={toggle} className={'text-neutral-800 cursor-pointer hover:underline'}>Create an account</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={'Login'}
            body={bodyContent}
            footer={footerContent}
            actionLabel={'Continue'}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
}

export default LoginModal;
