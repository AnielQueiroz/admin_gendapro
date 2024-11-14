import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { FiEdit, FiTrash, FiUserPlus } from 'react-icons/fi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from './ui/input';
import DeleteSomething from './delete-something';

const mockEmployers = [
  { id: 1, name: 'Fulano', email: 'fulano@email.com', phone: '123456789', role: 'Desenvolvedor' },
  { id: 2, name: 'Ciclano', email: 'ciclano@email.com', phone: '987654321', role: 'Gerente' },
  { id: 3, name: 'Beltrano', email: 'beltrano@email.com', phone: '123123123', role: 'Analista' },
];

interface SelectedEmployerProps {
    id: number;
    name: string;
}

const Employers: React.FC = () => {
    const navigate = useNavigate();
    const [employers, setEmployers] = useState(mockEmployers);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedEmployer, setSelectedEmployer] = useState<SelectedEmployerProps | null>(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Colunas da tabela
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            header: "Nome",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "role",
            header: "Cargo",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: "actions",
            header: "Ações",
            cell: ({ row }: any) => (
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("Editar: ", row.original.id)}
                    >
                        <FiEdit className='text-blue-600' />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(row.original.id, row.original.name)}
                    >
                        <FiTrash className="text-red-600" />
                    </Button>
                </div>
            ),
        }
    ], []);

    // Configuração do TanStack Table 
    const table = useReactTable({
        data: employers,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedEmployer(null);
    };
    
    const handleDeleteClick = (id: number, name: string) => {
        // setEmployers(prevEmployers => prevEmployers.filter(employer => employer.id !== id));
        setSelectedEmployer({ id, name });
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEmployer) {
            console.log(selectedEmployer);
            toast.success("Colaborador excluído com sucesso!");
            handleCloseDeleteDialog();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Button
                    className='flex items-center gap-2'
                    onClick={() => navigate("/admin/employee/create")}
                >
                    <FiUserPlus />
                    Criar colaborador
                </Button>

                {/* Campo de Busca */}
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Buscar colaborador..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="flex-grow"
                    />
                </div>    
            </div>

            {/* Tabela */}
            {/* <div className="overflow-auto border rounded-lg shadow"> */}
            <div className="overflow-hidden rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='text-center py-4'>
                                    Nenhum colaborador encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginação */}
            <div className="flex justify-between items-center mt-4">
                <span>
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <div className='flex gap-2'>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>

            {/* Modal de Exclusão */}
            {selectedEmployer && (
                <DeleteSomething
                    isOpen={isDeleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    onConfirm={handleConfirmDelete}
                    something={selectedEmployer.name}
                />
            )}
        </div>
    )
}

export default Employers;