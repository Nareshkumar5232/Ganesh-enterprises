const fs = require('fs');
const path = require('path');

const mappings = [
    { src: 'src/al_hikmath_app/page.tsx', dest: 'src/pages/Home.tsx' },
    { src: 'src/al_hikmath_app/products/page.tsx', dest: 'src/pages/Products.tsx' },
    { src: 'src/al_hikmath_app/products/[slug]/page.tsx', dest: 'src/pages/ProductDetails.tsx' },
    { src: 'src/al_hikmath_app/cart/page.tsx', dest: 'src/pages/Cart.tsx' },
    { src: 'src/al_hikmath_app/checkout/page.tsx', dest: 'src/pages/Checkout.tsx' },
    { src: 'src/al_hikmath_app/login/page.tsx', dest: 'src/pages/Login.tsx' },
    { src: 'src/al_hikmath_app/register/page.tsx', dest: 'src/pages/Register.tsx' },
    { src: 'src/al_hikmath_app/contact/page.tsx', dest: 'src/pages/Contact.tsx' },
    { src: 'src/al_hikmath_app/about/page.tsx', dest: 'src/pages/About.tsx' },
    { src: 'src/al_hikmath_app/wishlist/page.tsx', dest: 'src/pages/Wishlist.tsx' },
];

if (!fs.existsSync('src/pages')) {
    fs.mkdirSync('src/pages', { recursive: true });
}

for (const map of mappings) {
    if (fs.existsSync(map.src)) {
        fs.copyFileSync(map.src, map.dest);
    } else {
        console.log("Missing:", map.src);
    }
}
