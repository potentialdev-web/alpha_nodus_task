import React, { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { Order, Telecom } from "types/OrderType";
import { toCapitalCase } from "utils";

export interface OrderModalProps {
  /**
   * Whether shows modal or not
   */
  show: boolean;
  onHide: () => void;
  title: string;
  order: Order | null;
  updateOrder: (updatedOrder: Order) => void;
}

export const OrderModal = ({
  show,
  onHide,
  title,
  order,
  updateOrder,
}: OrderModalProps) => {
  const [firstName, setFirstName] = useState(order ? order.firstName : "");
  const [lastName, setLastName] = useState(order ? order.lastName : "");
  const [npi, setNPI] = useState(order ? order.npi ?? "" : "");
  const [address, setAddress] = useState(order ? order.address ?? "" : "");
  const [telecom, setTelecom] = useState<Telecom[]>(
    order ? order.telecom ?? [] : []
  );

  const handleTelecomChange = (
    index: number,
    field: keyof Telecom,
    value: string
  ) => {
    if (telecom) {
      const updatedTelecom: Telecom[] = [...telecom];
      updatedTelecom[index] = {
        ...updatedTelecom[index],
        [field]: value,
      };
      setTelecom(updatedTelecom);
    }
  };

  const renderTelecomFields = () => {
    return telecom.map((telecomItem, index) => (
      <div key={index}>
        <InputGroup className="mb-3">
          <InputGroup.Text>{toCapitalCase(telecomItem.system)}</InputGroup.Text>
          <Form.Control
            type="text"
            value={telecomItem.value}
            onChange={(e) =>
              handleTelecomChange(index, "value", e.target.value)
            }
          />
        </InputGroup>
      </div>
    ));
  };

  const handleSubmit = () => {
    const updatedOrder: Order = {
      ...order,
      firstName,
      lastName,
      npi,
      address,
      telecom,
    };
    onHide();
    updateOrder(updatedOrder);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>First and last name</InputGroup.Text>
          <Form.Control
            aria-label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Control
            aria-label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>NPI</InputGroup.Text>
          <Form.Control
            aria-label="npi"
            value={npi}
            onChange={(e) => setNPI(e.target.value)}
          />
        </InputGroup>
        {renderTelecomFields()}
        <InputGroup className="mb-3">
          <InputGroup.Text>Address</InputGroup.Text>
          <Form.Control
            aria-label="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
