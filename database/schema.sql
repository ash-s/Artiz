-- ====================================================================
-- KŪRA LIVING & ARCHITECTURAL INTERIORS
-- Relational Database Schema (SQL - PostgreSQL / MySQL compatible)
-- ====================================================================

-- 1. Categories & Room Classification
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    room_type VARCHAR(50) NOT NULL, -- LIVING, BEDROOM, DINING, KITCHEN, WORKSPACE, OUTDOOR
    description TEXT,
    banner_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Furniture Products
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    is_customizable BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    dimensions_summary VARCHAR(100), -- e.g. "W: 240cm × D: 102cm × H: 76cm"
    clearance_guide TEXT,
    description TEXT,
    materials_summary VARCHAR(255),
    featured_image TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Swatches (Material, Timber, and Fabric Finishes)
CREATE TABLE IF NOT EXISTS swatches (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    swatch_type VARCHAR(50) NOT NULL, -- TIMBER, FABRIC, CANE, METAL
    name VARCHAR(100) NOT NULL,       -- e.g. "Natural White Oak", "Warm Oat Bouclé"
    hex_color VARCHAR(20),
    texture_url TEXT,
    price_modifier NUMERIC(10, 2) DEFAULT 0.00
);

-- 4. Curated Shoppable Room Lookbooks
CREATE TABLE IF NOT EXISTS room_looks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    style_tag VARCHAR(100) NOT NULL,   -- e.g. "Japandi Serenity", "Organic Minimalist"
    main_image_url TEXT NOT NULL,
    description TEXT,
    package_price NUMERIC(10, 2),
    estimated_turnaround_weeks INT DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Interactive Hotspot Pins on Room Looks
CREATE TABLE IF NOT EXISTS room_hotspots (
    id BIGSERIAL PRIMARY KEY,
    room_look_id BIGINT REFERENCES room_looks(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    pin_number INT NOT NULL,
    pin_x_percent NUMERIC(5, 2) NOT NULL, -- e.g. 34.00%
    pin_y_percent NUMERIC(5, 2) NOT NULL, -- e.g. 68.00%
    custom_label VARCHAR(100)
);

-- 6. Interior Design Consultation & Bespoke Quote Inquiries
CREATE TABLE IF NOT EXISTS consultation_requests (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    room_type VARCHAR(100) NOT NULL,
    preferred_style VARCHAR(100) NOT NULL,
    budget_range VARCHAR(100) NOT NULL,
    project_notes TEXT,
    floorplan_attachment_url TEXT,
    status VARCHAR(50) DEFAULT 'NEW', -- NEW, REVIEWED, CONTACTED, ARCHIVED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. E-Commerce Orders
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(64) UNIQUE NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'CONFIRMED', -- CONFIRMED, PROCESSING, IN_TRANSIT, DELIVERED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Order Line Items
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    selected_swatch_name VARCHAR(100),
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_products_room ON products(room_type);
CREATE INDEX IF NOT EXISTS idx_products_cat ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_room_looks_type ON room_looks(room_type);
CREATE INDEX IF NOT EXISTS idx_hotspots_look ON room_hotspots(room_look_id);

