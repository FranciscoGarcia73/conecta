import { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useDownloadFile } from "../customHooks/useDownloadFile";

import "../styles/modalPdf.css";
//import pdf from "../data/Desplegar-NPM.pdf";

export const ModalPdf = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const url_file =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const downloadUrl = useDownloadFile(url_file);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Documento a validar
        </Modal.Title>
      </Modal.Header>
      <div className="button-modal d-flex justify-content-around m-3">
        <Button className="btn btn-success w-25">Aceptar</Button>
        <Button className="btn btn-danger w-25">Rechazar</Button>
      </div>
      <div className="text-modal mb-3 d-flex justify-content-center">
        <textarea
          className="w-75 h-100 input-text"
          placeholder="Especificar motivo rechazo (obligatorio)"
        />
      </div>
      <div className="button-descarga d-flex justify-content-center">
        <a
          className="enlace-descarga "
          href={downloadUrl}
          download="documento.pdf"
        >
          Descargar
        </a>
      </div>
      <Modal.Body>
        <Document
          file={
            "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf"
          }
          options={{
            workerSrc: "../node_modules/pdfjs-dist/build/pdf.worker.js",
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </Document>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
