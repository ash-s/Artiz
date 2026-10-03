package com.kura.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "room_looks")
public class RoomLook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(name = "room_type", nullable = false, length = 50)
    private String roomType;

    @Column(name = "style_tag", nullable = false, length = 100)
    private String styleTag; // e.g. "Japandi Serenity", "Organic Minimalist"

    @Column(name = "main_image_url", nullable = false, columnDefinition = "TEXT")
    private String mainImageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "package_price", precision = 10, scale = 2)
    private BigDecimal packagePrice;

    @Column(name = "estimated_turnaround_weeks")
    private Integer estimatedTurnaroundWeeks = 4;

    @OneToMany(mappedBy = "roomLook", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<RoomHotspot> hotspots = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public RoomLook() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getStyleTag() { return styleTag; }
    public void setStyleTag(String styleTag) { this.styleTag = styleTag; }

    public String getMainImageUrl() { return mainImageUrl; }
    public void setMainImageUrl(String mainImageUrl) { this.mainImageUrl = mainImageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPackagePrice() { return packagePrice; }
    public void setPackagePrice(BigDecimal packagePrice) { this.packagePrice = packagePrice; }

    public Integer getEstimatedTurnaroundWeeks() { return estimatedTurnaroundWeeks; }
    public void setEstimatedTurnaroundWeeks(Integer estimatedTurnaroundWeeks) { this.estimatedTurnaroundWeeks = estimatedTurnaroundWeeks; }

    public List<RoomHotspot> getHotspots() { return hotspots; }
    public void setHotspots(List<RoomHotspot> hotspots) { this.hotspots = hotspots; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
