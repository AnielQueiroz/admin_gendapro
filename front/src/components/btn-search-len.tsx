import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';

interface BtnSearchLenProps {
    btnLabel: string;
    btnIcon: React.ReactNode;
    btnAction: () => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
}

const BtnSearchLen: React.FC<BtnSearchLenProps> = ({
    btnLabel,
    btnIcon,
    btnAction,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Buscar...",
}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-2 mb-4'>
      <Button
        className='flex items-center gap-2'
        onClick={btnAction}
      >
        {btnIcon}
        {btnLabel}
      </Button>
      
      <Input 
        className='w-full md:w-auto'
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default BtnSearchLen;