import React, { useState, ChangeEvent } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import styled from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Order, Telecom } from "types/OrderType";
import { toCapitalCase } from "utils";

export interface OrderModalProps {
  /**
   * Whether to show the modal or not
   */
  show: boolean;

  /**
   * Function to handle hiding the modal
   */
  onHide: () => void;

  /**
   * The title of the modal
   */
  title: string;

  /**
   * The order object
   */
  order: Order | null;

  /**
   * Function to update the order
   */
  updateOrder: (updatedOrder: Order) => void;
}

export const OrderModal = ({
  show = false,
  onHide,
  title,
  order,
  updateOrder,
}: OrderModalProps) => {
  const [formData, setFormData] = useState({
    firstName: order?.firstName || "",
    lastName: order?.lastName || "",
    npi: order?.npi || "",
    address: order?.address || "",
    telecom: order?.telecom || [],
  });

  const handleInputChange =
    (name: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [name]: event.target.value });
    };

  const handleTelecomChange = (
    index: number,
    field: keyof Telecom,
    value: string
  ) => {
    setFormData({
      ...formData,
      telecom: formData.telecom.map((t, ind) =>
        ind === index ? { ...t, [field]: value } : t
      ),
    });
  };

  const handleSubmit = () => {
    const updatedOrder: Order = {
      ...order,
      ...formData,
      telecom: formData.telecom.map((t, index) => ({ ...t, rank: index + 1 })),
    };
    console.log(updatedOrder);
    onHide();
    updateOrder(updatedOrder);
  };

  const handleAddTelecomField = () => {
    setFormData({
      ...formData,
      telecom: [
        ...formData.telecom,
        { system: "", value: "", use: "", rank: 0 },
      ],
    });
  };

  const handleRemoveTelecomField = (index: number) => {
    const updatedTelecom = [...formData.telecom];
    updatedTelecom.splice(index, 1);
    setFormData({ ...formData, telecom: updatedTelecom });
  };

  const renderTelecomFields = () => {
    return formData.telecom.map((telecomItem, index) => (
      <div key={index}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={toCapitalCase(telecomItem.system)}
            placeholder="Type"
            onChange={(e) =>
              handleTelecomChange(index, "system", e.target.value)
            }
          />
          <Form.Control
            type="text"
            value={telecomItem.value}
            placeholder="Number"
            onChange={(e) =>
              handleTelecomChange(index, "value", e.target.value)
            }
          />
          <Form.Control
            type="text"
            value={telecomItem.use || ""}
            placeholder="Use"
            onChange={(e) => handleTelecomChange(index, "use", e.target.value)}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleRemoveTelecomField(index)}
          >
            <FaMinus />
          </Button>
        </InputGroup>
      </div>
    ));
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
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleInputChange("firstName")}
          />
          <Form.Control
            aria-label="Last name"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleInputChange("lastName")}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>NPI</InputGroup.Text>
          <Form.Control
            aria-label="npi"
            value={formData.npi}
            placeholder="NPI"
            onChange={handleInputChange("npi")}
          />
        </InputGroup>

        <Form.Label htmlFor="inputPassword5">Telecoms</Form.Label>
        {renderTelecomFields()}
        <div className="text-end">
          <Button
            variant="primary"
            className="mb-3"
            size="sm"
            onClick={handleAddTelecomField}
          >
            <FaPlus /> Add Telecom
          </Button>
        </div>

        <InputGroup className="mb-3">
          <InputGroup.Text>Address</InputGroup.Text>
          <Form.Control
            aria-label="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleInputChange("address")}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ButtonWrapper = styled.div``;
