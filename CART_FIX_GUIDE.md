# 🛒 Cart Not Working - Fix Guide

## Possible Issues:

### 1. **Check Browser Console (F12)**

Open browser console and look for errors:
- Red error messages
- "Cannot read property" errors
- Network errors

### 2. **Check if CartContext is Wrapped**

Make sure `App.jsx` has `CartProvider`:

```javascript
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Your app components */}
    </CartProvider>
  );
}
```

### 3. **Test Cart Functionality**

Try these steps:

**Step 1: Check Cart Count**
- Look at cart icon in navbar
- Should show "0" initially
- Number should increase when adding items

**Step 2: Add Product to Cart**
- Click "Add to cart" button
- Should see popup notification
- Cart count should increase

**Step 3: Open Cart**
- Click cart icon in navbar
- Cart sidebar should slide in from right
- Should show added products

**Step 4: Check Cart Items**
- Products should have image, name, price
- Quantity controls should work (+/-)
- Remove button should work

---

## 🔧 Quick Fixes:

### Fix 1: Ensure Product Structure is Correct

When adding to cart, make sure product has these fields:

```javascript
{
  id: number,
  title: string,  // or 'name'
  price: number,
  image: string,
  category: string
}
```

### Fix 2: Check CartSidebar CSS

Make sure `CartSidebar.css` exists and has proper z-index:

```css
.cart-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background: white;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
```

### Fix 3: Check if isOpen State Works

Add console.log to debug:

```javascript
// In Navbar.jsx
const toggleCart = () => {
  console.log('Cart toggled, isOpen:', !isCartOpen);
  setIsCartOpen(!isCartOpen);
};

// In CartSidebar.jsx
function CartSidebar({ isOpen, onClose }) {
  console.log('CartSidebar rendered, isOpen:', isOpen);
  console.log('Cart items:', cartItems);
  
  if (!isOpen) return null;
  // ...
}
```

---

## 🧪 Testing Steps:

### Test 1: Cart Icon Click
```
1. Open http://localhost:5173
2. Click cart icon (top right)
3. Expected: Cart sidebar slides in from right
4. If not working: Check console for errors
```

### Test 2: Add to Cart
```
1. Go to New Products page
2. Click "Add to cart" on any product
3. Expected: 
   - Popup shows "Added to cart"
   - Cart count increases
   - Product appears in cart
4. If not working: Check console for errors
```

### Test 3: Cart Operations
```
1. Open cart sidebar
2. Try increasing quantity (+)
3. Try decreasing quantity (-)
4. Try removing item (trash icon)
5. Expected: All operations work smoothly
```

---

## 🔍 Debug Commands:

### Check Cart State in Console:

```javascript
// Open browser console (F12) and type:

// Check if CartContext is available
window.cartContext = useCart();

// Check cart items
console.log(cartItems);

// Check cart count
console.log(getCartCount());
```

---

## 💡 Common Issues & Solutions:

### Issue 1: Cart Icon Not Clickable
**Solution:** Check z-index of navbar and cart button

### Issue 2: Cart Sidebar Not Showing
**Solution:** 
- Check if `isOpen` prop is being passed
- Check CSS transform property
- Check z-index

### Issue 3: Products Not Adding to Cart
**Solution:**
- Check product structure (id, title, price)
- Check if `addToCart` function is called
- Check console for errors

### Issue 4: Cart Count Not Updating
**Solution:**
- Check if CartContext is properly wrapped
- Check if `getCartCount()` is called
- Refresh page and try again

### Issue 5: Cart Sidebar Closes Immediately
**Solution:**
- Check if overlay click is triggering close
- Check event propagation
- Add `e.stopPropagation()` if needed

---

## 🛠️ Manual Fix:

If cart still not working, try this:

### Step 1: Clear Browser Cache
```
1. Press Ctrl + Shift + Delete
2. Clear cache and cookies
3. Refresh page (Ctrl + F5)
```

### Step 2: Restart Development Server
```bash
# Stop frontend (Ctrl + C)
cd react-project
npm run dev
```

### Step 3: Check App.jsx Structure

Make sure it looks like this:

```javascript
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
// ... other imports

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </CartProvider>
  );
}
```

---

## 📝 Specific Error Messages:

### Error: "useCart is not a function"
**Fix:** Make sure CartProvider wraps your app

### Error: "Cannot read property 'map' of undefined"
**Fix:** Initialize cartItems as empty array in CartContext

### Error: "getCartCount is not a function"
**Fix:** Check if CartContext exports getCartCount

---

## ✅ Verification Checklist:

- [ ] CartProvider wraps App
- [ ] Cart icon shows in navbar
- [ ] Cart count displays (even if 0)
- [ ] Clicking cart icon opens sidebar
- [ ] Add to cart button works
- [ ] Cart count increases when adding items
- [ ] Cart sidebar shows added items
- [ ] Quantity controls work
- [ ] Remove button works
- [ ] Checkout button navigates to /checkout

---

## 🆘 Still Not Working?

### Check These Files:

1. **App.jsx** - CartProvider wrapper
2. **Navbar.jsx** - Cart button and toggleCart function
3. **CartSidebar.jsx** - Sidebar component
4. **CartContext.jsx** - Context implementation
5. **NewProducts.jsx** - addToCart call

### Browser Console Commands:

```javascript
// Check if cart context exists
console.log(useCart);

// Check cart items
console.log(localStorage.getItem('cartItems'));

// Force re-render
window.location.reload();
```

---

## 🎯 Quick Test:

Open browser console and paste this:

```javascript
// Test if cart functions exist
const testCart = () => {
  console.log('Testing cart...');
  
  // Check if functions exist
  console.log('addToCart:', typeof addToCart);
  console.log('getCartCount:', typeof getCartCount);
  console.log('cartItems:', cartItems);
  
  // Try adding a test item
  addToCart({
    id: 999,
    title: 'Test Product',
    price: 100,
    image: '/test.jpg',
    category: 'Test'
  });
  
  console.log('Cart count after add:', getCartCount());
};

testCart();
```

---

**Ano ang specific error na nakikita mo? Check browser console (F12) and tell me the error message!** 🔍
