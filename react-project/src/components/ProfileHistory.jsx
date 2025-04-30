import React from 'react';
import './ProfileHistory.css';

function ProfileHistory({ orderHistory }) {
  return (
    <div className="profile-history">
      <h3>Order History</h3>
      
      {orderHistory.length === 0 ? (
        <div className="no-orders">You haven't placed any orders yet.</div>
      ) : (
        <div className="order-list">
          {orderHistory.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <div className="order-date">{order.date}</div>
                <div className="order-details">
                  <span className="order-count">{order.items.length} Items</span>
                  <span className="order-price">₱ {order.total.toFixed(2)}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  <span className="order-payment">{order.paymentMethod}</span>
                </div>
              </div>
              
              <div className="order-products">
                {order.items.map((item, index) => (
                  <div key={index} className="order-product">
                    <div className="product-image-container">
                      <div className="product-number">{index + 1}</div>
                      <img 
                        src={`../src/assets/images/product-${item.id}.jpg`} 
                        alt={item.name} 
                        className="product-image" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "../src/assets/images/Magnaflow-pipe.jpg";
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-details">
                      <div className="product-name">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-actions">
                <button className="buy-again-btn">Buy again</button>
              </div>
              
              <div className="order-separator">
                <span>End of History</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileHistory;
