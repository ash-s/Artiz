package com.kura.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "room_type", nullable = false, length = 50)
    private String roomType;

    @Column(name = "is_customizable")
    private Boolean isCustomizable = true;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "dimensions_summary", length = 100)
    private String dimensionsSummary;

    @Column(name = "clearance_guide", columnDefinition = "TEXT")
    private String clearanceGuide;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "materials_summary")
    private String materialsSummary;

    @Column(name = "featured_image", nullable = false, columnDefinition = "TEXT")
    private String featuredImage;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Swatch> swatches = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public Boolean getIsCustomizable() { return isCustomizable; }
    public void setIsCustomizable(Boolean isCustomizable) { this.isCustomizable = isCustomizable; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public String getDimensionsSummary() { return dimensionsSummary; }
    public void setDimensionsSummary(String dimensionsSummary) { this.dimensionsSummary = dimensionsSummary; }

    public String getClearanceGuide() { return clearanceGuide; }
    public void setClearanceGuide(String clearanceGuide) { this.clearanceGuide = clearanceGuide; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getMaterialsSummary() { return materialsSummary; }
    public void setMaterialsSummary(String materialsSummary) { this.materialsSummary = materialsSummary; }

    public String getFeaturedImage() { return featuredImage; }
    public void setFeaturedImage(String featuredImage) { this.featuredImage = featuredImage; }

    public List<Swatch> getSwatches() { return swatches; }
    public void setSwatches(List<Swatch> swatches) { this.swatches = swatches; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
