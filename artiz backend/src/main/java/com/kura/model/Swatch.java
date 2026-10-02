package com.kura.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "swatches")
public class Swatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference
    private Product product;

    @Column(name = "swatch_type", nullable = false, length = 50)
    private String swatchType; // TIMBER, FABRIC, CANE, METAL

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "hex_color", length = 20)
    private String hexColor;

    @Column(name = "texture_url", columnDefinition = "TEXT")
    private String textureUrl;

    @Column(name = "price_modifier", precision = 10, scale = 2)
    private BigDecimal priceModifier = BigDecimal.ZERO;

    public Swatch() {}

    public Swatch(Product product, String swatchType, String name, String hexColor, BigDecimal priceModifier) {
        this.product = product;
        this.swatchType = swatchType;
        this.name = name;
        this.hexColor = hexColor;
        this.priceModifier = priceModifier;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getSwatchType() { return swatchType; }
    public void setSwatchType(String swatchType) { this.swatchType = swatchType; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getHexColor() { return hexColor; }
    public void setHexColor(String hexColor) { this.hexColor = hexColor; }

    public String getTextureUrl() { return textureUrl; }
    public void setTextureUrl(String textureUrl) { this.textureUrl = textureUrl; }

    public BigDecimal getPriceModifier() { return priceModifier; }
    public void setPriceModifier(BigDecimal priceModifier) { this.priceModifier = priceModifier; }
}
