import React from 'react';

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.listOrderQty = this.listOrderQty.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {};
    };

    handleClick () {
        if (Object.values(this.state).includes(true)) {
            let newState = {};
            Object.keys(this.state).forEach(ele => {
                newState[ele] = false;
            });

            this.setState(newState, () => {
                document.removeEventListener("click", this.handleClick);
            })

        };
    };

    listOrderQty(cartItemId) {
        this.setState({[cartItemId]: true},() => {
            document.addEventListener("click", this.handleClick)
        });

    };

    render() {
        if (Object.keys(this.props.cartItems).length > 0) {
            let itemTotal=0;
            let cartItems = Object.values(this.props.cartItems).map((cartItem) => {

                if (cartItem.discount === "Free" || !cartItem.discount) {
                    // do nothing
                } else {
                    itemTotal += parseFloat(cartItem.discount.slice(1),10)*cartItem.quantity;
                }

                let numbers = [];

                for (let i=0; i<10; i++) {
                    numbers[i] = 
                    
                    <div onClick={() => {this.props.patchQtyToCart(
                    { cart: {
                        id: cartItem.id,
                        user_id: this.props.session.id,
                        product_id: cartItem.product_id,
                        quantity: i
                    }}).then(() => {
                        let newState = {};
                        Object.keys(this.state).forEach(ele => {
                            newState[ele] = false;
                        });
                    })
                    
                    }} key={i}>
                        {i}
                    </div>
                };

                return (
                    <div key={cartItem.id} className="item" >
                        <div className="cart-item">
                            <img src={cartItem.photoUrls} alt=""/>
                            <div className="item-info">
                                <div className="d-price">
                                    {cartItem.discount}
                                </div>
                                <div className="o-price">
                                    {cartItem.original_price}
                                </div>
                            </div>
                        </div>

                        <div className="quantity-item">
                            <div>
                                Quantity:
                            </div>
                            <div className="change-quantity" onClick={()=> {this.listOrderQty(cartItem.id)}}>
                                {this.state[cartItem.id] ? 
                                <div className='numberQTY'>
                                    {numbers}
                                </div>
                                
                                : null}

                                {cartItem.quantity}
                                <img src="arrow-down-icon.png" alt=""/>
                            </div>
                            <div onClick={() => { this.props.destroyItem({cart: {id: cartItem.id, user_id: cartItem.user_id}})}} className="remove-item"> 
                                Remove
                            </div>
                        </div>
                    </div>
                )
            });

            return (
                <div id="cart">
                    <div id="cart-items">
                        {cartItems}
                    </div>

                    <div id="order-summary">
                        <div className="order-desc">
                            Item Total
                            <div>
                                ${itemTotal}
                            </div>
                        </div>
                        <div className="order-desc">
                            Shipping
                            <div>
                                $0
                            </div>
                        </div>
                        <div className="order-desc">
                            Order Total
                            <div>
                                ${itemTotal}
                            </div>
                        </div>

                        <div id="checkout">
                            Place Order
                        </div>

                    </div>
                </div>
            )
        } else {
            return null;
        };
    };
};

export default Cart;