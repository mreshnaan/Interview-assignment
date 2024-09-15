import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

interface ModalProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, title, description, children }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[95vw] w-full sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="mt-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;