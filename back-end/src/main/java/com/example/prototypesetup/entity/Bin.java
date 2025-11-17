package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bin")
public class Bin {
    // !!! TO DO : Add foreign keys !!!

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bin_id")
    private Integer binId;

    @Column(name = "asset_tag", nullable = false, unique = true, length = 50)
    private String assetTag;

    @Column(name = "bin_contents", length = 255)
    private String binContents;

    @Column(name = "created_by_user_id", nullable = false)
    private Long createdByUserId;

    @Column(name = "location_id", nullable = false)
    private Integer locationId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;


    public Bin() {}

    public Integer getBinId() { return binId; }
    public void setBinId(Integer binId) { this.binId = binId; }

    public String getAssetTag() { return assetTag; }
    public void setAssetTag(String assetTag) { this.assetTag = assetTag; }

    public String getBinContents() { return binContents; }
    public void setBinContents(String binContents) { this.binContents = binContents; }

    public Long getCreatedByUserId() { return createdByUserId; }
    public void setCreatedByUserId(Long createdByUserId) { this.createdByUserId = createdByUserId; }

    public Integer getLocationId() { return locationId; }
    public void setLocationId(Integer locationId) { this.locationId = locationId; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
