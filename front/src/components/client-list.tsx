import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { FiEye, FiUser, FiUserPlus } from 'react-icons/fi';
import { Button } from './ui/button';
import DeleteSomething from './delete-something';
import { useNavigate } from 'react-router-dom';
import BtnSearchLen from './btn-search-len';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Lucas Silva",
    email: "lucas.silva@example.com",
    phone: "(11) 98765-4321",
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@example.com",
    phone: "(21) 91234-5678",
  },
  {
    id: 3,
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    phone: "(31) 99876-5432",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    phone: "(41) 92345-6789",
  },
  {
    id: 5,
    name: "Pedro Santos",
    email: "pedro.santos@example.com",
    phone: "(51) 93456-7890",
  },
  {
    id: 6,
    name: "Julia Ferreira",
    email: "julia.ferreira@example.com",
    phone: "(61) 94567-8901",
  },
  {
    id: 7,
    name: "Rafael Lima",
    email: "rafael.lima@example.com",
    phone: "(71) 95678-9012",
  },
  {
    id: 8,
    name: "Fernanda Costa",
    email: "fernanda.costa@example.com",
    phone: "(81) 96789-0123",
  },
  {
    id: 9,
    name: "Gustavo Almeida",
    email: "gustavo.almeida@example.com",
    phone: "(91) 97890-1234",
  },
  {
    id: 10,
    name: "Isabela Rodrigues",
    email: "isabela.rodrigues@example.com",
    phone: "(12) 98901-2345",
  },
];

interface SelectedClientProps {
  id: number;
  name: string;
}

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<SelectedClientProps | null>(null);
  const [search, setSearch] = useState("");

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedClient({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedClient) {
      setSelectedClient(null);
      setDeleteDialogOpen(false);
      toast.success("Cliente excluído com sucesso!");
    }
  };

  const handleCloseDeleteDialog = () => {
    setSelectedClient(null);
    setDeleteDialogOpen(false);
  }

  const filteredClients = clients.filter((client) => client.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div className="container mx-auto p-4">
      {/* Header com botao, busca e total de clientes */}
      <BtnSearchLen
        btnLabel="Criar cliente"
        btnIcon={<FiUserPlus />}
        btnAction={() => navigate("/operational/clients/create")}
        searchValue={search}
        onSearchChange={setSearch}
        totalOf="Clientes"
        total={filteredClients.length}
      />

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <FiUser className="text-blue-500" size={24} />
                <CardTitle className='text-lg font-semibold'>{client.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>E-mail: {client.email}</p>
              <p className='text-sm text-gray-600'>Telefone: {client.phone}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => console.log(`Ver detalhes: ${client.id}`)}
              >
                <FiEye />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de Exclusão */}
      {selectedClient && (
        <DeleteSomething
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
          something={selectedClient.name}
        />
      )}
    </div>
  )
}

export default ClientList;