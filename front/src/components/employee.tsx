import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DeleteSomething from "./delete-something";
import BtnSearchLen from "./btn-search-len";
import { getEmployees } from "@/features/services/get-employees";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

interface SelectedEmployerProps {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  barbershopId: string;
  roleId: string;
  role: Role;
}

const Employers: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employee } = useAuth();
  const establishmentId = employee?.barbershop.id ?? "";

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedEmployer, setSelectedEmployer] =
    useState<SelectedEmployerProps | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await getEmployees(establishmentId);
      if (!response.success) {
        toast.error(response.data.message);
        return;
      }
      setEmployees(response.data.professionals);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
      toast.error("Erro ao buscar colaboradores. Tente novamente mais tarde.");
    }
  }, [establishmentId]);

  useEffect(() => {
    if (establishmentId) fetchEmployees();
    else {
      toast.error("Ops, algo deu errado, faça login novamente!");
      dispatch(logout());
      navigate("/");
      return;
    }
  }, [fetchEmployees, establishmentId, navigate, dispatch]);

  // Colunas da tabela
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        cell: (info: { row: { original: Employee } }) => info.row.original.name,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info: { row: { original: Employee } }) =>
          info.row.original.email,
      },
      {
        accessorKey: "role",
        header: "Cargo",
        cell: (info: { row: { original: Employee } }) =>
          info.row.original.role.name,
      },
      {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row }: { row: { original: Employee } }) => (
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Editar: ", row.original.id)}
            >
              <FiEdit className="text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                handleDeleteClick(row.original.id, row.original.name)
              }
            >
              <FiTrash className="text-red-600" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Configuração do TanStack Table
  const table = useReactTable({
    data: employees,
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

  const handleDeleteClick = (id: string, name: string) => {
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
      {/* Header com botao, busca e total de clientes */}
      <BtnSearchLen
        btnLabel="Criar colaborador"
        btnIcon={<FiUserPlus />}
        btnAction={() => navigate("/admin/employee/create")}
        searchValue={globalFilter ?? ""}
        onSearchChange={setGlobalFilter}
        totalOf="Colaboradores"
        total={employees.length}
      />

      {/* Tabela */}
      {/* <div className="overflow-auto border rounded-lg shadow"> */}
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  Nenhum colaborador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button
            title="Anterior"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            &lt;
          </Button>
          <Button
            title="Próximo"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            &gt;
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
          id="delete-employee"
        />
      )}
    </div>
  );
};

export default Employers;
