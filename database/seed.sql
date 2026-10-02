-- ====================================================================
-- KŪRA LIVING & ARCHITECTURAL INTERIORS
-- Initial Seed Data (Japandi Warm Minimalist Furniture & Room Looks - INR / ₹)
-- ====================================================================

-- 1. Insert Categories
INSERT INTO categories (id, name, slug, room_type, description, banner_url) VALUES
(1, 'Sofas & Modular Loungers', 'sofas', 'LIVING', 'Deep comfort seating crafted with solid timber and tactile bouclé', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'),
(2, 'Solid Wood Dining Tables', 'dining-tables', 'DINING', 'Mortise-and-tenon heirloom dining tables in FSC-certified white oak and walnut', 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'),
(3, 'Low Sanctuary Beds', 'platform-beds', 'BEDROOM', 'Japanese floating platform beds inspired by Kyoto ryokans', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'),
(4, 'Occasional & Accent Seating', 'accent-chairs', 'LIVING', 'Sculptural wood and hand-caned rattan lounge armchairs', 'https://images.unsplash.com/photo-1580481077190-7361356a35a1?auto=format&fit=crop&w=1200&q=80'),
(5, 'Atmospheric Lighting', 'lighting', 'LIVING', 'Handmade washi rice paper lanterns and muted brass pendants', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80'),
(6, 'Minimalist Work Desks', 'desks', 'WORKSPACE', 'Clean-lined desks with concealed cable management and warm oak finish', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Products (Prices in INR ₹)
INSERT INTO products (id, category_id, name, slug, base_price, room_type, is_customizable, is_featured, dimensions_summary, clearance_guide, description, materials_summary, featured_image) VALUES
(1, 1, 'Sora Modular 3-Seater Sofa', 'sora-modular-sofa', 145000.00, 'LIVING', true, true, 'W: 240cm × D: 102cm × H: 76cm', 'Requires minimum 80cm clear hallway and doorway entry width.', 'Feather-soft dual density foam cushioned in high-tensile Belgian linen or textured oat bouclé. Supported by a low-profile solid white oak plinth.', 'FSC White Oak, Belgian Linen, High-Resilience Foam', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'),
(2, 2, 'Kyoto Refectory Dining Table', 'kyoto-refectory-table', 115000.00, 'DINING', true, true, 'W: 200cm × D: 95cm × H: 75cm', 'Allow 90cm perimeter clearance around all sides for comfortable chair movement.', 'Constructed using traditional Japanese joinery without exposed metal fasteners. Softened chamfered edges coated in zero-VOC organic hardwax-oil.', 'Solid American White Oak, Organic Hardwax-Oil', 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'),
(3, 4, 'Wabi Occasional Armchair', 'wabi-armchair', 58000.00, 'LIVING', true, true, 'W: 72cm × D: 78cm × H: 81cm', 'Compact footprint, fits easily through standard 70cm doors.', 'Curved solid ash timber backrest seamlessly integrated with hand-caned natural rattan mesh seating. Lightweight yet supremely sturdy.', 'Solid Ash, Hand-woven Rattan Cane', 'https://images.unsplash.com/photo-1580481077190-7361356a35a1?auto=format&fit=crop&w=800&q=80'),
(4, 1, 'Komorebi Low Coffee Table', 'komorebi-coffee-table', 42000.00, 'LIVING', true, false, 'W: 130cm × D: 70cm × H: 38cm', 'Maintain 40cm to 45cm distance between table and sofa.', 'Subtle organic pill-shaped silhouette resting on three cylindrical timber legs. Hand-rubbed satin finish.', 'Solid White Oak or Smoked Walnut', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'),
(5, 5, 'Washi Rice Paper Floor Lantern', 'washi-paper-lantern', 19500.00, 'LIVING', false, false, 'Dia: 42cm × H: 125cm', 'Fits any interior corner. Lightweight bamboo frame with warm 2700K ambient LED.', 'Inspired by traditional Gifu paper lanterns. Softens light evenly to create an intimate sanctuary ambience.', 'Mulberry Washi Paper, Bamboo Ribs, Cast Iron Base', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'),
(6, 3, 'Ryokan Low Platform Bed', 'ryokan-platform-bed', 128000.00, 'BEDROOM', true, true, 'W: 195cm × L: 215cm × H: 32cm', 'Requires 2-person assembly. Side ledges extend 15cm beyond standard Queen mattress.', 'Zen-inspired low platform design with integrated bedside floating ledges. Promotes grounded relaxation and restful sleep.', 'Solid Smoked Oak, Slatted Birch Foundation', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Swatches
INSERT INTO swatches (id, product_id, swatch_type, name, hex_color, price_modifier) VALUES
(1, 1, 'FABRIC', 'Warm Oat Bouclé', '#E5DFC5', 0.00),
(2, 1, 'FABRIC', 'Smoked Walnut Linen', '#4A3B32', 7500.00),
(3, 1, 'FABRIC', 'Forest Sage Velvet', '#566657', 12000.00),
(4, 2, 'TIMBER', 'Natural White Oak', '#D6BA91', 0.00),
(5, 2, 'TIMBER', 'Smoked American Walnut', '#543D2B', 14000.00),
(6, 2, 'TIMBER', 'Ebonized Black Ash', '#1C1917', 11000.00),
(7, 3, 'TIMBER', 'Bleached Ash & Natural Cane', '#E5DCB8', 0.00),
(8, 3, 'TIMBER', 'Walnut Frame & Noir Cane', '#3E2F26', 5000.00),
(9, 4, 'TIMBER', 'Natural Oak Finish', '#D6BA91', 0.00),
(10, 4, 'TIMBER', 'Smoked Walnut Finish', '#543D2B', 6000.00),
(11, 6, 'TIMBER', 'Natural White Oak', '#D6BA91', 0.00),
(12, 6, 'TIMBER', 'Smoked Dark Oak', '#3E2F26', 9500.00)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Shoppable Room Looks (Prices in INR ₹)
INSERT INTO room_looks (id, title, slug, room_type, style_tag, main_image_url, description, package_price, estimated_turnaround_weeks) VALUES
(1, 'Nordic Sanctuary Living Suite', 'nordic-sanctuary', 'LIVING', 'Japandi Serenity', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', 'An airy living space combining low-profile linen seating, organic timber coffee tables, and diffuse warm paper lanterns for mindful everyday relaxation.', 245000.00, 4),
(2, 'Kyoto Zen Tea & Dining Pavilion', 'kyoto-zen-dining', 'DINING', 'Organic Minimalist', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', 'Harmonious dining suite featuring solid oak refectory table, sculptural cane chairs, and understated ceramics bathed in soft natural daylight.', 215000.00, 5),
(3, 'Ryokan Minimalist Bedroom', 'ryokan-bedroom', 'BEDROOM', 'Japandi Sanctuary', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80', 'A restorative master bedroom suite with floating solid oak platform bed, integrated bedside ledges, and warm organic cotton bedding.', 185000.00, 3)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Hotspot Pins for Look 1
INSERT INTO room_hotspots (id, room_look_id, product_id, pin_number, pin_x_percent, pin_y_percent, custom_label) VALUES
(1, 1, 1, 1, 34.00, 68.00, 'Sora Modular Sofa'),
(2, 1, 4, 2, 62.00, 76.00, 'Komorebi Low Coffee Table'),
(3, 1, 5, 3, 82.00, 48.00, 'Washi Rice Paper Lantern')
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Hotspot Pins for Look 2
INSERT INTO room_hotspots (id, room_look_id, product_id, pin_number, pin_x_percent, pin_y_percent, custom_label) VALUES
(4, 2, 2, 1, 48.00, 64.00, 'Kyoto Refectory Table'),
(5, 2, 3, 2, 28.00, 72.00, 'Wabi Occasional Armchair')
ON CONFLICT (id) DO NOTHING;

