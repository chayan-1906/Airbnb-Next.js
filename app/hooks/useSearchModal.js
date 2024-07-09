import {create} from "zustand";

const useSearchModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useSearchModal;
