import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { requisitosValidar } from "../data/requisitosValidar";

import { GetServicioByIdServicio } from "../selectors/GetServicioByIdServicio";

export const Dashboard = ({ token }) => {
  const [searchText, setSearchText] = useState("");
  const [requisitosValidarFilter, setRequisitosValidarFilter] =
    useState(requisitosValidar);
  const idServicio = "71505cd1-1d95-434e-81d5-169be0192d07";
  const navigate = useNavigate();

  const { response, error, loading } = GetServicioByIdServicio(
    token,
    idServicio
  );

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  const handleFilter = (e) => {
    if (e.target.value === "default") {
      setRequisitosValidarFilter(requisitosValidar);
    } else {
      setRequisitosValidarFilter(
        requisitosValidar.filter((requisito) =>
          requisito.tipo.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleBuscar = () => {
    setRequisitosValidarFilter(
      requisitosValidar.filter(
        (requisito) =>
          requisito.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          requisito.requisito.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <div className="dashboard">
      <header>
        <button className="btn btn-secondary m-3" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="container">
        <h1>Dashboard</h1>
        <hr />
        <div className="d-flex justify-content-between">
          <select
            defaultValue={"default"}
            className="m-1 h-75"
            name="searchText"
            onChange={handleFilter}
          >
            <option value="default">Selecciona Tipo</option>
            <option value="servicio">Servicio</option>
            <option value="proveedor">Proveedor</option>
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
              onClick={() => handleBuscar()}
            >
              Buscar
            </button>
            <button
              className="btn btn-primary m-1 h-75 w-50 rounded"
              onClick={() => {
                setRequisitosValidarFilter(requisitosValidar);
                setSearchText("");
              }}
            >
              Mostrar Todos
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table table-hover mt-5">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Tipo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Requisito</th>
                <th scope="col">Subido el</th>
              </tr>
            </thead>
            <tbody>
              {requisitosValidarFilter.map((requisito) => {
                return (
                  <tr key={requisito.id}>
                    <th scope="row">
                      <button className="btn btn-success">Ver</button>
                    </th>
                    <td className="align-middle">{requisito.tipo}</td>
                    <td className="align-middle">{requisito.nombre}</td>
                    <td className="align-middle">{requisito.requisito}</td>
                    <td className="align-middle">{requisito.subido}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {console.log(searchText)}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.response.statusText}</div>}
        {response && (
          <div> Conexion correcta</div>
          // <>
          //   <p>Finca: {response.idFinca} </p>
          //   <p>Administrador: {response.idAdministrador} </p>
          //   <p>Servicio: {response.idServicio} </p>
          //   <p>Fecha inicio: {response.fechaInicio} </p>
          //   <p>Fecha fin: {response.fechaFin} </p>
          // </>
        )}
      </div>
    </div>
  );
};
