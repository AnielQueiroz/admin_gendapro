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
    total: number;
    totalOf: string;
}

const BtnSearchLen: React.FC<BtnSearchLenProps> = ({
    btnLabel,
    btnIcon,
    btnAction,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Buscar...",
    total,
    totalOf
}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-2 mb-4'>
      <div className='lg:flex gap-2 w-full lg:w-9/12'>
        <Button
          className='flex items-center gap-2 mb-2 lg:mb-0'
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

      {/* Mostrador de total de : */}
      <div className='text-gray-600 text-sm mt-2 md:mt-0'>
        Total de {totalOf}: <span className="font-semibold">{total}</span>
      </div>
    </div>
  )
}

export default BtnSearchLen;