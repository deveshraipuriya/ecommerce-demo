import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import '../../components/styles.css';
import Product from '../Product/Product';
import QuantityModal from "../../UI/Modal/QuantityModal";
import cartReducer from '../../store/reducers/cartReducer';
import { ADD_TO_CART, INCREASE_PRODUCT_COUNT } from '../../store/actions/actionconstants';
import Navbar from '../Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function HomeComponent() {
    const [productList, setProductList] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState({});
    const [qty, setQuantity] = React.useState(0);

    const [cartArray, dispatch] = React.useReducer(cartReducer, [], () => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : []
    })
    const hideModal = () => {
        setModalShow(false)
    }
    const showModal = (item) => {
        setCurrentItem(item);
        setModalShow(true);
        setQuantity(0);
    }
    const onBuyClick = () => {
        let exist = false;
        for (let item of cartArray) {
            if (item.product_id === currentItem.product_id) {
                exist = true
                break;
            }
        }
        if (exist) {
            dispatch({ type: INCREASE_PRODUCT_COUNT, payload: { id: currentItem.product_id, qtyAdded: qty } })
        }
        else {
            let newItemtoCart = {
                product_id: currentItem.product_id,
                product_name: currentItem.product_name,
                product_price: currentItem.product_price,
                product_qty: qty,
            }
            dispatch({ type: ADD_TO_CART, payload: newItemtoCart })
        }
        setModalShow(false);
    }
    React.useEffect(() => {
        console.log("Current Cart", cartArray);
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }, [cartArray])
    React.useEffect(() => {
        let prodlist = JSON.parse(localStorage.getItem('prodList'))
        setProductList(prodlist);
    }, [])
    return (
        <>
            <Navbar />
            <CardColumns className="outer-box">
                {
                    !productList || productList.length === 0 ?
                        <Card className="inner-box">
                            <Card.Body>
                                <Row>
                                    <Col md={12}><Card.Title>Add Products From Admin Panel</Card.Title></Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        :
                        productList.map(item => (
                            <Product key={item.product_id} item={item} onShowModal={() => { showModal(item) }} />
                        ))

                }
            </CardColumns>
            <QuantityModal
                show={modalShow}
                onHide={hideModal}
                qty={qty}
                onQuantityChange={(t) => setQuantity(qty + t)}
                onBuyClick={onBuyClick}
            />
        </>
    )
}
