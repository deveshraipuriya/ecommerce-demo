import React from 'react'
import Table from 'react-bootstrap/Table'
import '../styles.css';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import EditProductModal from '../../UI/Modal/EditProductModal';
export default function AvailableProductsList(props) {
    const [productsArray, setProductArray] = React.useState([]);
    const [currentItem, setCurrentItem] = React.useState({});
    const { productsList, deleteProduct, updateProductDetail } = props;

    //modal
    const [modalShow, setModalShow] = React.useState(false);
    const hideModal = () => {
        setModalShow(false)
    }
    const showModal = (item) => {
        console.log(item)
        setCurrentItem(item);
        setModalShow(true);
    }
    ///

    const saveChanges = (updated) => {
        console.log(updated);
        updateProductDetail(updated);
        // setModalShow(false);
    }

    React.useEffect(() => {
        setProductArray(productsList);
    }, [productsList])

    return (
        <>
            <Table className="tableSize" striped bordered hover>
                <thead>
                    <tr><td className="headerBackground" colSpan={4}>List of Available Products</td></tr>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Image URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsArray.map(({ product_id, image_url, product_name, product_price }) => (
                            <tr key={product_id}>
                                <td>{product_name}</td>
                                <td>{product_price}</td>
                                <td>
                                    <a href={image_url}>
                                        Go to Image
                                    </a>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <FaEdit className="cursorPointer"
                                                        onClick={() => { showModal({ product_id, image_url, product_name, product_price }) }}
                                                    />
                                                </td>
                                                <td>
                                                    <AiFillDelete className="cursorPointer"
                                                        onClick={() => deleteProduct(product_id)}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
            <EditProductModal
                show={modalShow}
                onHide={hideModal}
                onSaveClick={(updated) => { saveChanges(updated) }}
                currentItem={currentItem}
            />
        </>
    )
}
