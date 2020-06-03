import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import '../../components/styles.css';
function QuantityModal(props) {
    const { show, onHide, qty, onBuyClick, onQuantityChange } = props;
    return (
        <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Quantity for this item.
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="show-grid">
                        <Col md={3}></Col>
                        <Col md={2}>
                            {qty > 0 ? <FaMinusCircle className="cursorPointer" onClick={() => { onQuantityChange(-1) }} /> : ""}
                        </Col>
                        <Col md={2}>
                            {qty}
                        </Col>
                        <Col md={2}>
                            <FaPlusCircle onClick={() => { onQuantityChange(1) }} />
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button disabled={qty === 0} onClick={onBuyClick}>Buy</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default QuantityModal;