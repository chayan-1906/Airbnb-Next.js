'use client';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";

function RegisterModal() {
    let registerModal = useRegisterModal();
    let loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    let router = useRouter();

    let {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback?.error);
                }
            });
            registerModal.onClose();
        }).catch((error) => {
            console.log(error);
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading title={'Welcome to Airbnb'} subtitle={'Create an account!'}/>
            <Input id={'name'} label={'Name'} disabled={isLoading} register={register} errors={errors} required/>
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
                    <div>Already have an account?</div>
                    <div onClick={toggle} className={'text-neutral-800 cursor-pointer hover:underline'}>Log in</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={'Register'}
            body={bodyContent}
            footer={footerContent}
            actionLabel={'Continue'}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
}

export default RegisterModal;
