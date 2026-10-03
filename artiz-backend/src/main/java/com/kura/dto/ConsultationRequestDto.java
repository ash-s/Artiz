package com.kura.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ConsultationRequestDto {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    private String phone;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotBlank(message = "Preferred aesthetic style is required")
    private String preferredStyle;

    @NotBlank(message = "Budget range is required")
    private String budgetRange;

    private String projectNotes;
    private String floorplanAttachmentUrl;

    public ConsultationRequestDto() {}

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
}
