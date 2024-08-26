import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Payment.css";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product, quantity } = state || {};
    const totalAmount = product ? product.price * 75 * quantity : 0;

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handlePay = () => {
        alert('Order Confirmed!');
        navigate('/');
    };

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(value);
    }

    return (
        <div className="payment-page-container">
            <h3 className="payment-page-title">Payment Options</h3>
            <div className="payment-page-amount">
                Amount to Pay: <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="payment-page-methods">
                <label className="payment-page-method">
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        onChange={() => handlePaymentMethodChange('card')}
                    />
                    <p className="payment-option-text">Card</p>
                </label>
                <label className="payment-page-method">
                    <input
                        type="radio"
                        name="payment"
                        value="upi"
                        onChange={() => handlePaymentMethodChange('upi')}
                    />
                    <p className="payment-option-text">UPI</p>
                </label>
                <label className="payment-page-method">
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        onChange={() => handlePaymentMethodChange('cod')}
                    />
                    <p className="payment-option-text">Cash on Delivery</p>
                </label>
            </div>

            {paymentMethod === 'card' && (
                <div className="payment-page-card-details">
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YY)"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="payment-page-upi-details">
                    <input
                        type="text"
                        placeholder="UPI ID"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                    />
                </div>
            )}
            
            <button className="payment-page-pay-btn" onClick={handlePay}>Pay</button>
        </div>
    );
};

export default PaymentPage;