import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ModalPdf } from "./ModalPdf";

import "../styles/dashboard.css";

//import requisitosDatos from "../data/requisitosDatos.js";

import { GetRequisitosPendientes } from "../selectors/GetRequisitosPendientes";

export const Dashboard = ({ token }) => {
  const [requisitosValidar, setRequisitosValidar] = useState([]);
  const [requisitosValidarFilter, setRequisitosValidarFilter] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchSelectText, setSearchSelectText] = useState("default");
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  const handleBuscar = () => {
    setRequisitosValidarFilter(
      requisitosValidar.filter(
        (requisito) =>
          requisito.nombreSujeto
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          requisito.requisito.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const handleFilter = (searchSelectText) => {
      if (searchSelectText === "default") {
        setRequisitosValidarFilter(requisitosValidar);
      } else {
        setRequisitosValidarFilter(
          requisitosValidar.filter((requisito) =>
            requisito.sujeto
              .toLowerCase()
              .includes(searchSelectText.toLowerCase())
          )
        );
      }
    };

    handleFilter(searchSelectText);
  }, [searchSelectText]);

  GetRequisitosPendientes(
    token,
    setRequisitosValidar,
    setRequisitosValidarFilter,
    setLoading,
    setError
  );

  return (
    <>
      {loading && <div>Cargando...</div>}
      {error && <div>{error.message}</div>}
      {requisitosValidar && (
        <div>
          <div className="dashboard">
            <header>
              <button className="btn btn-light m-3" onClick={handleLogout}>
                Logout
              </button>
            </header>
            <div className="container">
              <h1 className="mt-3">Requisitos por Validar</h1>
              <hr />
              <div className="d-flex justify-content-between mb-5">
                <select
                  defaultValue={"default"}
                  className="mt-1 rounded selector"
                  name="searchText"
                  value={searchSelectText}
                  onChange={(e) => setSearchSelectText(e.target.value)}
                >
                  <option value="default">Selecciona Sujeto</option>
                  <option value="servicio">Servicio</option>
                  <option value="documentacion">Documentacion</option>
                  <option value="trabajador">Trabajador</option>
                </select>
                <div className="searchTextArea d-flex justify-content-end w-75">
                  <input
                    type="text"
                    className="w-100 h-75 p-1 mt-1 me-2 rounded"
                    placeholder="Encuentra por nombre o requisito"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button
                    className="btn btn-primary m-1 h-75 rounded"
                    onClick={handleBuscar}
                  >
                    Buscar
                  </button>
                  <button
                    className="btn btn-primary m-1 h-75 w-50 rounded"
                    onClick={() => {
                      setRequisitosValidarFilter(requisitosValidar);
                      setSearchSelectText("default");
                      setSearchText("");
                    }}
                  >
                    Mostrar Todos Pendientes
                  </button>
                </div>
              </div>
              <div className="total border border-light bg-info rounded d-inline p-2">
                Total: {requisitosValidarFilter.length}
              </div>
              <div className="table-container">
                <table className="table table-hover mt-5">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Requisito</th>
                      <th scope="col">Sujeto</th>
                      <th scope="col" className="text-center">
                        Fecha de Subida
                      </th>
                      <th scope="col" className="text-center">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisitosValidarFilter.map((requisito) => {
                      return (
                        <tr key={requisito.idEvidenciaRequisito}>
                          <th scope="row">
                            <button
                              className="btn btn-success"
                              onClick={() => setModalShow(true)}
                            >
                              Ver
                            </button>
                          </th>
                          <td className="align-middle">
                            {requisito.nombreSujeto}
                          </td>
                          <td className="align-middle">
                            {requisito.requisito}
                          </td>
                          <td className="align-middle">{requisito.sujeto}</td>
                          <td className="align-middle text-center">
                            {requisito.timeStamp}
                          </td>
                          <td className="align-middle text-center">
                            {requisito.estadoRequisito}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalPdf show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
