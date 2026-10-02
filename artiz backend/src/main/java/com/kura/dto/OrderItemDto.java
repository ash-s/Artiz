package com.kura.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrderItemDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    private String selectedSwatchName;

    @NotNull
    @Positive
    private Integer quantity = 1;

    public OrderItemDto() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getSelectedSwatchName() { return selectedSwatchName; }
    public void setSelectedSwatchName(String selectedSwatchName) { this.selectedSwatchName = selectedSwatchName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
