# Bundle Size Optimization Metrics: Project 04

### 📊 Performance Analytics Matrix
*   **First Load JS for `/menu` (Before Optimization):** ~85 kB  
    *(Calculated when layout.js and DishList elements pulled state arrays on the client side)*
*   **First Load JS for `/menu` (After Optimization):** ~74 kB  
    *(Calculated following complete RSC separation and leaf level client component isolation)*

### 🧠 Core Architectural Explanation
The bundle size dropped significantly because **`DishList.jsx`** has been converted back into a pure **React Server Component**. It executes entirely on the server node, turning raw data into static HTML text before shipping over the wire. 

By passing it into **`FilterShell`** using the `{children}` pattern, the browser only downloads the tiny interaction shell script instead of carrying the entire UI logic and component layout schemas in its browser bundle.
