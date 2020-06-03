import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function QuantityModal(props) {
    const { show, onHide, onSaveClick, currentItem } = props;

    const [validated, setValidated] = React.useState(false);  //form validation

    const [image_url, setImageURL] = React.useState("");
    const [product_name, setProductName] = React.useState("");
    const [product_price, setProductPrice] = React.useState(0);

    React.useEffect(() => {
        //console.log("Inside Modal", currentItem);
        setImageURL(currentItem.image_url)
        setProductName(currentItem.product_name)
        setProductPrice(currentItem.product_price)
    }, [currentItem])

    const updateHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            onHide();
            setValidated(true);
            onSaveClick({ product_id: currentItem.product_id, product_name, product_price, image_url })
        }
    }

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Product Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="formSizeModal"
                    noValidate
                    validated={validated}
                    onSubmit={updateHandler}>
                    <Form.Group controlId="imageURL">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter updated url for image"
                            value={image_url}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter updated product name"
                            value={product_name}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="productPrice">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter updated price for product"
                            value={product_price}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={onSaveClick}
                    >
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default QuantityModal;