package com.kura.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "room_hotspots")
public class RoomHotspot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_look_id", nullable = false)
    @JsonBackReference
    private RoomLook roomLook;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "pin_number", nullable = false)
    private Integer pinNumber;

    @Column(name = "pin_x_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal pinXPercent; // e.g. 34.00

    @Column(name = "pin_y_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal pinYPercent; // e.g. 68.00

    @Column(name = "custom_label", length = 100)
    private String customLabel;

    public RoomHotspot() {}

    public RoomHotspot(RoomLook roomLook, Product product, Integer pinNumber, BigDecimal pinXPercent, BigDecimal pinYPercent, String customLabel) {
        this.roomLook = roomLook;
        this.product = product;
        this.pinNumber = pinNumber;
        this.pinXPercent = pinXPercent;
        this.pinYPercent = pinYPercent;
        this.customLabel = customLabel;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RoomLook getRoomLook() { return roomLook; }
    public void setRoomLook(RoomLook roomLook) { this.roomLook = roomLook; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getPinNumber() { return pinNumber; }
    public void setPinNumber(Integer pinNumber) { this.pinNumber = pinNumber; }

    public BigDecimal getPinXPercent() { return pinXPercent; }
    public void setPinXPercent(BigDecimal pinXPercent) { this.pinXPercent = pinXPercent; }

    public BigDecimal getPinYPercent() { return pinYPercent; }
    public void setPinYPercent(BigDecimal pinYPercent) { this.pinYPercent = pinYPercent; }

    public String getCustomLabel() { return customLabel; }
    public void setCustomLabel(String customLabel) { this.customLabel = customLabel; }
}
