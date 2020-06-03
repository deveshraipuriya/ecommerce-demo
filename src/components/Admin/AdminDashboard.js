import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../components/styles.css';
import Navbar from '../Navbar';
import productReducer from '../../store/reducers/productReducer';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from '../../store/actions/actionconstants';
import { v4 as uuidv4 } from 'uuid';
import AvailableProducts from './AvailableProductsList';

export default function AdminDashboard() {
    const [validated, setValidated] = React.useState(false);  //form validation

    const [image_url, setImageURL] = React.useState("");
    const [product_name, setProductName] = React.useState("");
    const [product_price, setProductPrice] = React.useState(0);

    const [productsList, setProductsList] = React.useState([]);
    const [showAddForm, setShowAddForm] = React.useState(false);

    const [productArray, dispatch] = React.useReducer(productReducer, [], () => {
        const localproductArray = localStorage.getItem('prodList');
        return localproductArray ? JSON.parse(localproductArray) : []
    })

    //add product
    const addProduct = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            dispatch({ type: ADD_PRODUCT, payload: { product_id: uuidv4(), image_url, product_name, product_price } })
            setValidated(true);
            setShowAddForm(false);
            setImageURL("");
            setProductName("");
            setProductPrice(0);
        }
    };
    //delete product
    const deleteProduct = (id) => {
        console.log("@#$%^&", id);
        dispatch({ type: DELETE_PRODUCT, payload: id })
    }
    //update product details
    const updateProductDetails = (updatedProduct) => {
        console.log(updatedProduct)
        dispatch({ type: EDIT_PRODUCT, payload: updatedProduct })
    }
    //
    React.useEffect(() => {
        console.log("Current ProductList", productArray);
        setProductsList(productArray);
        localStorage.setItem('prodList', JSON.stringify(productArray));
    }, [productArray])
    return (
        <>
            <Navbar />
            {
                productsList.length > 0 ? (
                    <AvailableProducts
                        productsList={productsList}
                        deleteProduct={(id) => { deleteProduct(id) }}
                        updateProductDetail={(updatedProduct) => { updateProductDetails(updatedProduct) }}
                    />
                ) : null
            }

            {
                showAddForm ? (
                    <Form className="formSize" noValidate validated={validated} onSubmit={addProduct}>
                        <Form.Group controlId="imageURL">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter url for image"
                                value={image_url}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter new product name"
                                value={product_name}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Enter price for product"
                                value={product_price}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Product
                        </Button>
                    </Form>
                )
                    :
                    (
                        <div className="buttonClass">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={() => { setShowAddForm(true); setValidated(false) }}>
                                Add Products
                            </Button>
                        </div>
                    )
            }
        </>
    )
}
