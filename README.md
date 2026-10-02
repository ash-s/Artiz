# KŪRA Living & Interiors Platform
### Hybrid Furniture E-Commerce Store & Architectural Interior Design Studio

Built with:
- **Frontend**: Next.js 15 (React 19, TypeScript), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Java 21 Spring Boot 3 (REST API, Spring Data JPA, Hibernate, H2 / PostgreSQL)
- **Database**: Relational SQL (`schema.sql` and `seed.sql`)

---

## 🏛️ Key Features

1. **2.5D Depth & Tactile Micro-Interactions**:
   - Card tilt and perspective hover effects (`perspective: 1000px`)
   - Smooth layout transitions without heavy 3D rendering engines for sub-second page loads.
2. **Room-Centric Hubs**:
   - Organized by space: *Living Room, Dining, Bedroom, Workspace, Modular Kitchen*.
   - Filter furniture pieces or entire designed suites.
3. **Interactive Shoppable Room Canvas**:
   - Editorial room scenes with interactive pulsing hotspot pins (1, 2, 3).
   - Dynamic popovers showing exact dimensions, swatch finishes, and instant add-to-bag.
4. **Live Material & Swatch Switcher**:
   - FSC White Oak, Smoked American Walnut, Ebonized Ash, Oat Bouclé, and Sage Velvet.
   - Updates product photos and prices in real time.
5. **Interior Design Consultation & Quote Wizard**:
   - 4-step guided questionnaire for custom room designs, budget scoping, and aesthetic preferences.
   - Connected directly to the Java Spring Boot REST API (`POST /api/consultations`).
6. **Dimension & Space Fit Guide**:
   - Doorway clearance rules, walkway spacing guidelines (75–90cm), and architectural tips.
7. **Slide-Out Curated Bag & Checkout**:
   - Line items with chosen swatches, subtotal calculations, and White Glove delivery confirmations.

---

## 🚀 Running the Project

### 1. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Backend (Java Spring Boot)

Ensure JDK 17+ or 21 is installed. (You can install via `winget install Microsoft.OpenJDK.21` or use your existing JDK).

```bash
cd backend
# Using Maven:
mvn spring-boot:run
```

- REST API runs at: `http://localhost:8080/api`
- Test endpoints:
  - `GET http://localhost:8080/api/products`
  - `GET http://localhost:8080/api/room-looks`
  - `POST http://localhost:8080/api/consultations`
  - `POST http://localhost:8080/api/orders`
- Built-in H2 Web Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:kuradb`
  - Username: `sa` / Password: *(leave blank)*

---

### 3. Database (SQL)

- `database/schema.sql`: Full relational DDL script (tables for categories, products, swatches, room looks, hotspots, consultation requests, and orders).
- `database/seed.sql`: Rich initial seed data with Japandi furniture and shoppable room suites.
