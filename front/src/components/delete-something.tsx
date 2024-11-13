import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from './ui/button';

interface DeleteProps  {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    something: string;
}
  
const DeleteSomething: React.FC<DeleteProps> = ({ isOpen, onClose, onConfirm, something }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
                <DialogDescription>
                    Essa ação não poderá ser desfeita! Você está excluindo: <strong>{something}</strong>
                </DialogDescription>
            </DialogHeader>
            <div className='flex justify-end gap-2 mt-4'>
                <Button variant="outline" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Excluir
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteSomething;