package com.kura.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultation_requests")
public class ConsultationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false, length = 150)
    private String customerName;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(name = "room_type", nullable = false, length = 100)
    private String roomType;

    @Column(name = "preferred_style", nullable = false, length = 100)
    private String preferredStyle;

    @Column(name = "budget_range", nullable = false, length = 100)
    private String budgetRange;

    @Column(name = "project_notes", columnDefinition = "TEXT")
    private String projectNotes;

    @Column(name = "floorplan_attachment_url", columnDefinition = "TEXT")
    private String floorplanAttachmentUrl;

    @Column(nullable = false, length = 50)
    private String status = "NEW"; // NEW, REVIEWED, CONTACTED, ARCHIVED

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public ConsultationRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getPreferredStyle() { return preferredStyle; }
    public void setPreferredStyle(String preferredStyle) { this.preferredStyle = preferredStyle; }

    public String getBudgetRange() { return budgetRange; }
    public void setBudgetRange(String budgetRange) { this.budgetRange = budgetRange; }

    public String getProjectNotes() { return projectNotes; }
    public void setProjectNotes(String projectNotes) { this.projectNotes = projectNotes; }

    public String getFloorplanAttachmentUrl() { return floorplanAttachmentUrl; }
    public void setFloorplanAttachmentUrl(String floorplanAttachmentUrl) { this.floorplanAttachmentUrl = floorplanAttachmentUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
