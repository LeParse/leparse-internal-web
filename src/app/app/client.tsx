"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  AnimatedPage,
  Background,
  Switcher,
  Spacer,
  Table,
  Modal,
  Input,
  UnitiesList,
  Button,
  LoadingFreeze,
  colors,
} from "@leparse/ui";

import { Enterprise, Unity, Address } from "@leparse/ui/dist/types";
import Icons from "@leparse/ui/dist/icons";

import { toast } from "react-toastify";

import {
  Container,
  EditEnterpriseModal,
  Enterprises,
  RemoveEnterpriseModal,
} from "./styles";

const Client = () => {
  const [items] = useState<string[]>(["Empresas", "Configurações"]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [editEnterpriseModal, setEditEnterpriseModal] =
    useState<boolean>(false);
  const [removeEnterpriseModal, setRemoveEnterpriseModal] =
    useState<boolean>(true);

  const [enterpriseId, setEnterpriseId] = useState<string>();
  const [enterpriseName, setEnterpriseName] = useState<string>();
  const [enterprisePrincipalName, setEnterprisePrincipalName] =
    useState<string>();
  const [enterprisePrincipalEmail, setEnterprisePrincipalEmail] =
    useState<string>();
  const [enterprisePrincipalPhone, setEnterprisePrincipalPhone] =
    useState<string>();
  const [enterpriseCNPJ, setEnterpriseCNPJ] = useState<string>();
  const [enterpriseUnities, setEnterpriseUnities] = useState<Unity[]>([]);
  const [enterpriseZipCode, setEnterpriseZipCode] = useState<string>("");
  const [enterpriseStreet, setEnterpriseStreet] = useState<string>("");
  const [enterpriseNumber, setEnterpriseNumber] = useState<string>("");
  const [enterpriseComplement, setEnterpriseComplement] = useState<string>("");

  const [isFetchingCEP, setIsFetchingCEP] = useState<boolean>(false);

  function onItemClick(index: number) {
    setCurrentTab(index);
  }

  async function searchCEP() {
    try {
      setIsFetchingCEP(true);

      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${enterpriseZipCode}`
      );

      const data = await response.json();

      if (data?.type === "service_error") throw 404;

      setEnterpriseStreet(data.street);
    } catch (err) {
      if (err === 404) return toast.warning("CEP não encontrado!");
      toast.error("Falha ao pesquisar CEP!");
    } finally {
      setTimeout(() => {
        setIsFetchingCEP(false);
      }, 500);
    }
  }

  async function saveEnterprise() {
    try {
    } catch (error) {
      toast.error("Erro ao salvar empresa!");
    }
  }

  const EnterprisesTab = () => {
    return (
      <Enterprises key="enterprises">
        <p className="title">Empresas</p>
        <Spacer />
        <Table
          data={[
            {
              name: "LeParse Ltda",
              principal_name: "Igor Augusto Gomes de Melo",
              principal_email: "dev.igoraugusto@gmail.com",
              principal_phone: "(11) 9 9859-3969",
              cnpj: "48.588.921/0001-43",
              address: {
                street: "Rua Manuel Dias de Oliveira",
                number: "59",
                complement: "Bloco A Apto 42",
                zip_code: "05528-010",
              },
              unities: [
                {
                  _id: "xdzinhooo",
                  name: "Unidade 1",
                  color: "red",
                },
                {
                  _id: "xdzaoooo",
                  name: "Unidade 2",
                  color: "blue",
                },
                {
                  _id: "xdzito",
                  name: "Unidade 3",
                  color: "green",
                },
                {
                  _id: "xdcock",
                  name: "Unidade 4",
                  color: "yellow",
                },
              ],
              groups: [],
            },
          ]}
          fields={[
            "name",
            "principal_name",
            "principal_email",
            "principal_phone",
            "cnpj",
          ]}
          labels={["Nome", "Representante", "E-mail R.", "Telefone R.", "CNPJ"]}
          actions
          editActionClick={(d: Enterprise) => {
            setEnterpriseId(d._id);
            setEnterpriseName(d.name);
            setEnterpriseCNPJ(d.cnpj);
            setEnterprisePrincipalName(d.principal_name);
            setEnterprisePrincipalEmail(d.principal_email);
            setEnterprisePrincipalPhone(d.principal_phone);
            setEnterpriseZipCode(d.address.zip_code);
            setEnterpriseStreet(d.address.street);
            setEnterpriseNumber(d.address.number);
            setEnterpriseComplement(d.address.complement || "");
            setEditEnterpriseModal(true);
          }}
          deleteActionClick={(d: Enterprise) => {
            setEnterpriseId(d._id);
            setRemoveEnterpriseModal(true);
          }}
        />
      </Enterprises>
    );
  };

  return (
    <Container>
      <Background />
      <Switcher
        items={items}
        initialItem={items[0]}
        onClickItem={onItemClick}
        style={{
          zIndex: 0,
        }}
      />

      <AnimatedPage className="tabs">
        <AnimatePresence mode="wait">
          {currentTab === 0 && <EnterprisesTab />}

          {currentTab === 1 && (
            <AnimatedPage className="tab" key={"settings"}>
              <h1>Configuracoes</h1>
            </AnimatedPage>
          )}
        </AnimatePresence>
      </AnimatedPage>

      <Modal
        isOpen={editEnterpriseModal}
        setIsOpen={setEditEnterpriseModal}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "85%",
          height: "fit-content",
          padding: "2rem",
        }}
      >
        <EditEnterpriseModal>
          <div className="header">
            <p className="title">Editar empresa</p>
            <Icons.Close
              className="close_button"
              size={32}
              onClick={() => setEditEnterpriseModal(false)}
            />
          </div>

          <Spacer />

          <div className="leftRight">
            <div className="left">
              <div className="leftData">
                <p>Nome:</p>
                <Input
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                />
              </div>
              <div className="leftData">
                <p>Representante:</p>
                <Input
                  value={enterprisePrincipalName}
                  onChange={(e) => setEnterprisePrincipalName(e.target.value)}
                />
              </div>
              <div className="leftData">
                <p>E-mail de contato:</p>
                <Input
                  value={enterprisePrincipalEmail}
                  onChange={(e) => setEnterprisePrincipalEmail(e.target.value)}
                />
              </div>
              <div className="leftData">
                <p>Telefone de contato:</p>
                <Input
                  value={enterprisePrincipalPhone}
                  onChange={(e) => setEnterprisePrincipalPhone(e.target.value)}
                />
              </div>
              <div className="leftData">
                <p>CNPJ:</p>
                <Input
                  value={enterpriseCNPJ}
                  onChange={(e) => setEnterpriseCNPJ(e.target.value)}
                />
              </div>
            </div>
            <Spacer vertical />
            <div className="right">
              <div className="unities">
                <AnimatePresence mode="popLayout">
                  <UnitiesList
                    unities={enterpriseUnities}
                    selectedUnities={["xdzinhooo"]}
                    template=""
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="data">
              <p>CEP:</p>
              <Input
                style={{
                  width: "8rem",
                }}
                masked
                mask="99999-999"
                withBorder
                value={enterpriseZipCode}
                onChange={(e) => setEnterpriseZipCode(e.target.value)}
              />
            </div>

            <Button onClick={searchCEP}>
              <Icons.Search size={24} />
            </Button>

            <div className="data">
              <p>Logradouro:</p>
              <Input
                style={{
                  width: "15rem",
                }}
                withBorder
                value={enterpriseStreet}
              />
            </div>

            <div className="data">
              <p>Número:</p>
              <Input
                style={{
                  width: "5rem",
                }}
                withBorder
                value={enterpriseNumber}
                onChange={(e) => setEnterpriseNumber(e.target.value)}
              />
            </div>

            <div className="data">
              <p>Complemento:</p>
              <Input
                withBorder
                value={enterpriseComplement}
                onChange={(e) => setEnterpriseComplement(e.target.value)}
              />
            </div>

            <Button
              style={{
                right: "2rem",
                position: "absolute",
                background: colors.orange,
              }}
              onClick={saveEnterprise}
            >
              Salvar
            </Button>

            <LoadingFreeze show={isFetchingCEP} />
          </div>
        </EditEnterpriseModal>
      </Modal>

      <Modal
        isOpen={removeEnterpriseModal}
        setIsOpen={setRemoveEnterpriseModal}
        shouldCloseOnOverlayClick
        contentStyle={{
          width: "30%",
          height: "45%",
          padding: "2rem",
        }}
      >
        <RemoveEnterpriseModal>
          <div className="header">
            <Icons.Close
              className="close_button"
              size={32}
              onClick={() => setRemoveEnterpriseModal(false)}
            />
          </div>
          <p className="confirmation">
            Tem certeza que deseja deletar essa empresa?
          </p>
          <p className="confirmation_sub">
            (Essa ação não poderá ser desfeita)
          </p>
          <Spacer />
          <Button
            style={{
              width: "100%",
              background: colors.red,
            }}
          >
            Confirmar exclusão
          </Button>
        </RemoveEnterpriseModal>
      </Modal>
    </Container>
  );
};

export default Client;
