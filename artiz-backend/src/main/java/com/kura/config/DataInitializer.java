package com.kura.config;

import com.kura.model.*;
import com.kura.repository.CategoryRepository;
import com.kura.repository.ProductRepository;
import com.kura.repository.RoomLookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(CategoryRepository categoryRepo,
                                  ProductRepository productRepo,
                                  RoomLookRepository roomLookRepo) {
        return args -> {
            if (productRepo.count() > 0) return;

            // 1. Categories
            Category cLiving = categoryRepo.save(new Category(
                    "Sofas & Modular Loungers", "sofas", "LIVING",
                    "Deep comfort seating crafted with solid timber and tactile bouclé",
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
            ));

            Category cDining = categoryRepo.save(new Category(
                    "Solid Wood Dining Tables", "dining-tables", "DINING",
                    "Mortise-and-tenon heirloom dining tables in FSC-certified white oak and walnut",
                    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80"
            ));

            Category cChairs = categoryRepo.save(new Category(
                    "Occasional & Accent Seating", "accent-chairs", "LIVING",
                    "Sculptural wood and hand-caned rattan lounge armchairs",
                    "https://images.unsplash.com/photo-1580481077190-7361356a35a1?auto=format&fit=crop&w=1200&q=80"
            ));

            Category cBed = categoryRepo.save(new Category(
                    "Low Sanctuary Beds", "platform-beds", "BEDROOM",
                    "Japanese floating platform beds inspired by Kyoto ryokans",
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
            ));

            // 2. Products
            Product p1 = new Product();
            p1.setCategory(cLiving);
            p1.setName("Sora Modular 3-Seater Sofa");
            p1.setSlug("sora-modular-sofa");
            p1.setBasePrice(new BigDecimal("1890.00"));
            p1.setRoomType("LIVING");
            p1.setIsCustomizable(true);
            p1.setIsFeatured(true);
            p1.setDimensionsSummary("W: 240cm × D: 102cm × H: 76cm");
            p1.setClearanceGuide("Requires minimum 80cm clear doorway entry width.");
            p1.setDescription("Feather-soft dual density foam cushioned in high-tensile Belgian linen or textured oat bouclé. Supported by a low-profile solid white oak plinth.");
            p1.setMaterialsSummary("FSC White Oak, Belgian Linen, High-Resilience Foam");
            p1.setFeaturedImage("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80");
            p1.getSwatches().add(new Swatch(p1, "FABRIC", "Warm Oat Bouclé", "#E5DFC5", BigDecimal.ZERO));
            p1.getSwatches().add(new Swatch(p1, "FABRIC", "Smoked Walnut Linen", "#4A3B32", new BigDecimal("90.00")));
            p1.getSwatches().add(new Swatch(p1, "FABRIC", "Forest Sage Velvet", "#566657", new BigDecimal("160.00")));
            productRepo.save(p1);

            Product p2 = new Product();
            p2.setCategory(cDining);
            p2.setName("Kyoto Refectory Dining Table");
            p2.setSlug("kyoto-refectory-table");
            p2.setBasePrice(new BigDecimal("1450.00"));
            p2.setRoomType("DINING");
            p2.setIsCustomizable(true);
            p2.setIsFeatured(true);
            p2.setDimensionsSummary("W: 200cm × D: 95cm × H: 75cm");
            p2.setClearanceGuide("Allow 90cm perimeter clearance around all sides.");
            p2.setDescription("Constructed using traditional Japanese joinery without exposed metal fasteners. Softened chamfered edges.");
            p2.setMaterialsSummary("Solid American White Oak, Organic Hardwax-Oil");
            p2.setFeaturedImage("https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80");
            p2.getSwatches().add(new Swatch(p2, "TIMBER", "Natural White Oak", "#D6BA91", BigDecimal.ZERO));
            p2.getSwatches().add(new Swatch(p2, "TIMBER", "Smoked American Walnut", "#543D2B", new BigDecimal("170.00")));
            p2.getSwatches().add(new Swatch(p2, "TIMBER", "Ebonized Black Ash", "#1C1917", new BigDecimal("130.00")));
            productRepo.save(p2);

            Product p3 = new Product();
            p3.setCategory(cChairs);
            p3.setName("Wabi Occasional Armchair");
            p3.setSlug("wabi-armchair");
            p3.setBasePrice(new BigDecimal("720.00"));
            p3.setRoomType("LIVING");
            p3.setIsCustomizable(true);
            p3.setIsFeatured(true);
            p3.setDimensionsSummary("W: 72cm × D: 78cm × H: 81cm");
            p3.setClearanceGuide("Compact footprint, fits easily through standard 70cm doors.");
            p3.setDescription("Curved solid ash timber backrest seamlessly integrated with hand-caned natural rattan mesh seating.");
            p3.setMaterialsSummary("Solid Ash, Hand-woven Rattan Cane");
            p3.setFeaturedImage("https://images.unsplash.com/photo-1580481077190-7361356a35a1?auto=format&fit=crop&w=800&q=80");
            p3.getSwatches().add(new Swatch(p3, "TIMBER", "Bleached Ash & Natural Cane", "#E5DCB8", BigDecimal.ZERO));
            p3.getSwatches().add(new Swatch(p3, "TIMBER", "Walnut Frame & Noir Cane", "#3E2F26", new BigDecimal("60.00")));
            productRepo.save(p3);

            Product p4 = new Product();
            p4.setCategory(cLiving);
            p4.setName("Komorebi Low Coffee Table");
            p4.setSlug("komorebi-coffee-table");
            p4.setBasePrice(new BigDecimal("640.00"));
            p4.setRoomType("LIVING");
            p4.setIsCustomizable(true);
            p4.setIsFeatured(false);
            p4.setDimensionsSummary("W: 130cm × D: 70cm × H: 38cm");
            p4.setClearanceGuide("Maintain 40cm to 45cm distance between table and sofa.");
            p4.setDescription("Subtle organic pill-shaped silhouette resting on three cylindrical timber legs.");
            p4.setMaterialsSummary("Solid White Oak or Smoked Walnut");
            p4.setFeaturedImage("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80");
            p4.getSwatches().add(new Swatch(p4, "TIMBER", "Natural Oak Finish", "#D6BA91", BigDecimal.ZERO));
            p4.getSwatches().add(new Swatch(p4, "TIMBER", "Smoked Walnut Finish", "#543D2B", new BigDecimal("80.00")));
            productRepo.save(p4);

            // 3. Shoppable Room Look with Hotspots
            RoomLook look = new RoomLook();
            look.setTitle("Nordic Sanctuary Living Suite");
            look.setSlug("nordic-sanctuary");
            look.setRoomType("LIVING");
            look.setStyleTag("Japandi Serenity");
            look.setMainImageUrl("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80");
            look.setDescription("An airy living space combining low-profile linen seating and organic timber tables.");
            look.setPackagePrice(new BigDecimal("3150.00"));
            look.setEstimatedTurnaroundWeeks(4);

            look.getHotspots().add(new RoomHotspot(look, p1, 1, new BigDecimal("34.00"), new BigDecimal("68.00"), "Sora Modular Sofa"));
            look.getHotspots().add(new RoomHotspot(look, p4, 2, new BigDecimal("62.00"), new BigDecimal("76.00"), "Komorebi Low Coffee Table"));
            roomLookRepo.save(look);
        };
    }
}
