import React, { ForwardedRef, ReactNode, useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import { MdWifiCalling } from "react-icons/md";

import { SimpleSpinner, SimpleAlert, OrderModal } from "components";
import { Icons } from "consts";

import { Order } from "types";

import { toCapitalCase } from "utils";

interface InfoPropertyProps {
  label: string;
  content: ReactNode;
  img: string;
}

interface CustomToggleProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface OrderingProviderProps {
  /**
   * The order object containing information about the order.
   */
  order: Order | null;
  /**
   * Indicates whether the component is currently loading data or performing an asynchronous operation.
   */
  isLoading?: boolean;

  /**
   * The error message associated with any errors encountered during data loading or asynchronous operations.
   */
  error: string | null;
  /**
   * The callback for updating order infomation
   */
  updateOrder: (updatedOrder: Order) => void;
}

const InfoProperty = ({ label, content, img }: InfoPropertyProps) => (
  <Row>
    <Col xs={4}>
      <img src={img} height={15} style={{ verticalAlign: "baseline" }} />
      &nbsp;
      <strong>{label}</strong>
    </Col>
    <Col xs={8}>
      {content ? (
        <>
          {content}
          <a href="">
            <AiOutlineCopy />
          </a>
        </>
      ) : (
        <>
          No {label} <a href="">Add</a>
        </>
      )}
    </Col>
  </Row>
);

const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(
  ({ children, onClick }, ref: ForwardedRef<HTMLButtonElement>) => (
    <button
      className="btn"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  )
);

/**
 * Ordering Provider component
 */
export const OrderingProvider = ({
  order,
  isLoading,
  error,
  updateOrder,
}: OrderingProviderProps) => {
  const [modalShow, setModalShow] = useState(false);

  const showModal = () => setModalShow(true);

  const hideModal = () => setModalShow(false);

  const OrderingProviderDropdown = () => (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
        <FaEllipsisH />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={showModal}>Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <Card style={{ width: "36rem" }}>
        <Card.Body>
          {isLoading ? (
            <div className="text-center">
              <SimpleSpinner animation="grow" />
            </div>
          ) : (
            <>
              {error && <SimpleAlert variant="danger" msg={error} />}
              {order && (
                <>
                  <OrderModal
                    show={modalShow}
                    onHide={hideModal}
                    title="Edit Ordering Infomation"
                    order={order}
                    updateOrder={updateOrder}
                  />

                  <InfoHeader>
                    <Row>
                      <Col xs={11}>
                        <Card.Subtitle className="mb-2 text-muted">
                          Ordering Provider
                        </Card.Subtitle>
                        <Card.Title>
                          {`${order.firstName} ${order.lastName}`}{" "}
                          <a href="">
                            <AiOutlineCopy />
                          </a>
                        </Card.Title>
                      </Col>
                      <Col xs={1}>
                        <OrderingProviderDropdown />
                      </Col>
                    </Row>
                  </InfoHeader>

                  <InfoBody>
                    <InfoProperty
                      label="NPI"
                      content={order.npi}
                      img={Icons["NPI"]}
                    />

                    {order.telecom!.map((item, index) => (
                      <InfoProperty
                        key={index}
                        label={toCapitalCase(item.system)}
                        content={
                          <>
                            {item.value || `No ${toCapitalCase(item.system)}`}
                            <sup>
                              <MdWifiCalling color="#009933" />
                            </sup>
                          </>
                        }
                        img={Icons[`${item.system}`]}
                      />
                    ))}

                    <InfoProperty
                      label="Address"
                      content={order.address}
                      img={Icons["Address"]}
                    />
                  </InfoBody>
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

const InfoHeader = styled.div`
  padding: 1rem 1rem 0rem 1rem;
`;

const InfoBody = styled.div`
  padding: 1rem 2rem;
`;
