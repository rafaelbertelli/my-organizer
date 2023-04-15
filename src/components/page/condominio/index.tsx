import { Tenant } from "@/backend/domain/tenant";
import PopUpModal from "@/components/ui/modal/popup-modal";
import WrapperModal from "@/components/ui/modal/wrapper-modal";
import useTenant from "@/hooks/tenant";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import RegisterForm from "./fragments/register-form";

export default function Condominium() {
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(null);

  const { stateTenant, deleteTenant, registerTenant } = useTenant();

  const handleModalConfirmation = (tenant: Tenant | null) => {
    setActiveTenant(tenant);
    setShowModalConfirmation(!showModalConfirmation);
  };

  const handleModalRegister = (tenant?: Tenant) => {
    tenant && setActiveTenant(tenant);
    setShowModalRegister(!showModalRegister);
  };

  const handleRegisterTenant = async (tenant: Tenant, cb: () => void) => {
    await registerTenant(tenant);
    setShowModalRegister(false);
    cb && cb();
  };

  const handleDeleteTenant = (cb: () => void) => {
    deleteTenant(activeTenant);
    setShowModalConfirmation(false);
    cb && cb();
  };

  const pageReady = Boolean(!stateTenant.isError && !stateTenant.isLoading);

  return (
    <>
      {stateTenant.isError && <p>Erro!</p>}

      {stateTenant.isLoading && <p>carregando</p>}

      {pageReady && (
        <>
          {stateTenant.data && (
            <div className="pb-4">
              <Table hoverable={true}>
                <Table.Head>
                  <Table.HeadCell>Condômino</Table.HeadCell>
                  <Table.HeadCell>Apartamento</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                  {stateTenant.data.result?.map((t) => {
                    return (
                      <Table.Row
                        key={t.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {t.name}
                        </Table.Cell>
                        <Table.Cell>{t.apartment}</Table.Cell>
                        <Table.Cell>
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleModalRegister(t)}
                          >
                            Editar
                          </button>
                          {" | "}
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleModalConfirmation(t)}
                          >
                            Excluir
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-end">
            <Button onClick={() => handleModalRegister()}>Novo Cadastro</Button>
          </div>

          <WrapperModal
            show={showModalRegister}
            handleModal={handleModalRegister}
          >
            <RegisterForm
              register={(tenant: Tenant, cb: () => void) =>
                handleRegisterTenant(tenant, cb)
              }
              payload={activeTenant}
            />
          </WrapperModal>

          <PopUpModal
            show={showModalConfirmation}
            handleModal={handleModalConfirmation}
            message="Você tem certeza que quer excluir este condômino?"
            confirmMessage="Sim, tenho certeza"
            cancelMessage="Não, cancelar"
            confirmAction={(cb: () => void) => handleDeleteTenant(cb)}
          />
        </>
      )}
    </>
  );
}
