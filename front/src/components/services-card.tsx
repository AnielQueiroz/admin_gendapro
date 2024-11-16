import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { FiEdit3, FiPlus, FiTrash } from "react-icons/fi";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { Label } from "./ui/label";
import * as Yup from "yup";
import DeleteSomething from "./delete-something";
import BtnSearchLen from "./btn-search-len";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getServices } from "@/features/services/get-services";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/features/auth/authSlice";

interface Services {
  barbershopId: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

const ServicesCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employee } = useAuth();
  const establishmentId = employee?.barbershop.id ?? "";

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<Services[]>([]);

  // Estados para controlar os campos do form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchServices = useCallback(async () => {
    try {
      const response = await getServices(establishmentId);
      if (!response.success) {
        toast.error(response.data.message);
      }
      setServices(response.data.services);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      toast.error("Erro ao buscar serviços. Tente novamente mais tarde.");
    }
  }, [establishmentId]);

  useEffect(() => {
    if (establishmentId) fetchServices();
    else {
      toast.error("Ops, algo deu errado, faça login novamente!");
      dispatch(logout());
      navigate("/");
      return;
    }
  }, [fetchServices, dispatch, navigate, establishmentId]);

  const serviceSchema = Yup.object().shape({
    name: Yup.string()
      .required("O nome do serviço é obrigatório")
      .min(3, "O nome do serviço deve ter no mínimo 3 caracteres"),
    description: Yup.string()
      .required("A descrição do serviço é obrigatória")
      .min(10, "A descrição deve ter pelo menos 10 caracteres."),
    price: Yup.string().required("O preço do serviço é obrigatório"),
    imageUrl: Yup.string().required("A imagem do serviço é obrigatória"),
  });

  const filteredServices = services.filter((service) =>
    service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  // const formatCurrencyBRL = (value: string) => {
  //   const numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
  //   const formattedValue = new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(Number.parseFloat(numericValue) / 100);

  //   if (formattedValue === "R$NaN") return "R$ 0,00";

  //   return formattedValue;
  // };

  const handleCreateNew = () => {
    setSelectedService(null);
    setName("");
    setDescription("");
    setPrice(0);
    setImageUrl("");
    setErrors({});
    setOpenDialog(true);
  };

  const handleEditClick = (service: Services) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setImageUrl(service.imageUrl);
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedService(null);
  };

  const handleDeleteClick = (service: Services) => {
    setSelectedService(service);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedService) {
      console.log(selectedService);
      toast.success(`${selectedService.name} deletado com sucesso`);
      handleCloseDeleteDialog();
    }
  };

  const handleSaveService = async (event: React.FormEvent) => {
    event.preventDefault();

    const serviceToSave = {
      id: selectedService ? selectedService.id : new Date().getTime(),
      name,
      description,
      price,
      imageUrl,
    };

    try {
      // Validação com Yup
      await serviceSchema.validate(serviceToSave, { abortEarly: false });
      console.log("Salvar serviço:", serviceToSave);
      setOpenDialog(false);
      toast.success("Serviço salvo com sucesso!");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        for (const error of err.inner) {
          toast.error(error.message);
          if (error.path) validationErrors[error.path] = error.message;
        }
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <BtnSearchLen
        btnLabel="Criar serviço"
        btnIcon={<FiPlus />}
        btnAction={() => handleCreateNew()}
        searchValue={search}
        onSearchChange={setSearch}
        totalOf="Serviços"
        total={filteredServices.length}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
              <p className="text-gray-600 mt-2 font-bold">R$ {service.price}</p>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button
                title="Editar"
                onClick={() => handleEditClick(service)}
                variant="default"
              >
                <FiEdit3 />
              </Button>
              <Button
                title="Excluir"
                onClick={() => handleDeleteClick(service)}
                variant="default"
              >
                <FiTrash className="text-red-600" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de Criação/Edição */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedService
                ? `Editar serviço: ${selectedService.name}`
                : "Novo serviço"}
            </DialogTitle>
          </DialogHeader>
          {/* Conteúdo do modal aqui */}
          <form className="space-y-4">
            <div>
              <Label htmlFor="nomeServico">Nome do serviço</Label>
              <Input
                id="nomeServico"
                type="text"
                placeholder="Nome do serviço"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                errorMessage={errors.name}
              />
            </div>
            <div>
              <Label className="mt-4" htmlFor="descricaoServico">
                Descrição do serviço
              </Label>
              <Input
                id="descricaoServico"
                type="text"
                placeholder="Descrição do serviço"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                errorMessage={errors.description}
              />
            </div>
            <div>
              <Label className="mt-4" htmlFor="precoServico">
                Preço do serviço
              </Label>
              <Input
                id="precoServico"
                type="text"
                placeholder="Preço do serviço"
                value={price}
                onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
                error={!!errors.price}
                errorMessage={errors.price}
              />
            </div>
            <div>
              <Label className="mt-4" htmlFor="imgServico">
                Imagem do serviço
              </Label>
              <Input
                id="imgServico"
                type="text"
                placeholder="Imagem do serviço"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                error={!!errors.imageUrl}
                errorMessage={errors.imageUrl}
              />
            </div>
            <div className="flex justify-end">
              <Button
                title="Salvar"
                onClick={handleSaveService}
                variant="default"
              >
                {selectedService ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Exclusão */}
      {selectedService && (
        <DeleteSomething
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
          something={selectedService.name}
          id="delete-service-modal"
        />
      )}
    </div>
  );
};

export default ServicesCard;
