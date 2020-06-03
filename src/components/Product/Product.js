import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function Product(props) {
    const { image_url, product_name, product_price } = props.item;
    return (
        <Card className="inner-box">
            <Card.Img className="imageHeight" variant="top" src={image_url} />
            <Card.Body>
                <Row>
                    <Col md={8}><Card.Title>{product_name}</Card.Title></Col>
                    <Col md={4}><Card.Title>$ {product_price}</Card.Title></Col>
                </Row>
                <Card.Text>
                    <Button
                        variant="secondary"
                        size="lg" block
                        onClick={props.onShowModal}
                    >
                        Select Quantity
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
