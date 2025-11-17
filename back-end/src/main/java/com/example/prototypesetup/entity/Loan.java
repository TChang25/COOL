package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "loan")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private Integer loanId;

    @ManyToOne
    @JoinColumn(name = "bin_id", nullable = false)
    private Bin bin;

    @ManyToOne
    @JoinColumn(name = "loan_status_id", nullable = false)
    private LoanStatus loanStatus;

    @ManyToOne
    @JoinColumn(name = "citizen_id", nullable = false)
    private AppUser citizen;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private AppUser employee;

    @Column(name = "start_at", nullable = false)
    private Timestamp startAt;

    @Column(name = "due_at", nullable = false)
    private Timestamp dueAt;

    @Column(name = "returned_at")
    private Timestamp returnedAt;

    @ManyToOne
    @JoinColumn(name = "loan_condition_id", nullable = false)
    private DeviceCondition loanCondition;

    @Column(name = "loan_condition_notes", columnDefinition = "TEXT")
    private String loanConditionNotes;

    @ManyToOne
    @JoinColumn(name = "return_condition_id")
    private DeviceCondition returnCondition;

    @Column(name = "return_condition_notes", columnDefinition = "TEXT")
    private String returnConditionNotes;

    @Column(name = "damage_fee", precision = 10, scale = 2)
    private BigDecimal damageFee;

    @Column(name = "all_accessories_returned")
    private Boolean allAccessoriesReturned;

    @Column(name = "missing_accessories", columnDefinition = "TEXT")
    private String missingAccessories;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    public Loan() {}

    public Integer getLoanId() { return loanId; }
    public void setLoanId(Integer loanId) { this.loanId = loanId; }

    public Timestamp getStartAt() { return startAt; }
    public void setStartAt(Timestamp startAt) { this.startAt = startAt; }

    public Timestamp getDueAt() { return dueAt; }
    public void setDueAt(Timestamp dueAt) { this.dueAt = dueAt; }

    public Timestamp getReturnedAt() { return returnedAt; }
    public void setReturnedAt(Timestamp returnedAt) { this.returnedAt = returnedAt; }

    public String getLoanConditionNotes() { return loanConditionNotes; }
    public void setLoanConditionNotes(String loanConditionNotes) { this.loanConditionNotes = loanConditionNotes; }

    public String getReturnConditionNotes() { return returnConditionNotes; }
    public void setReturnConditionNotes(String returnConditionNotes) { this.returnConditionNotes = returnConditionNotes; }

    public BigDecimal getDamageFee() { return damageFee; }
    public void setDamageFee(BigDecimal damageFee) { this.damageFee = damageFee; }

    public Boolean getAllAccessoriesReturned() { return allAccessoriesReturned; }
    public void setAllAccessoriesReturned(Boolean allAccessoriesReturned) { this.allAccessoriesReturned = allAccessoriesReturned; }

    public String getMissingAccessories() { return missingAccessories; }
    public void setMissingAccessories(String missingAccessories) { this.missingAccessories = missingAccessories; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    public Bin getBin() { return bin; }
    public void setBin(Bin bin) { this.bin = bin; }

    public LoanStatus getLoanStatus() { return loanStatus; }
    public void setLoanStatus(LoanStatus loanStatus) { this.loanStatus = loanStatus; }

    public AppUser getCitizen() { return citizen; }
    public void setCitizen(AppUser citizen) { this.citizen = citizen; }

    public AppUser getEmployee() { return employee; }
    public void setEmployee(AppUser employee) { this.employee = employee; }

    public DeviceCondition getLoanCondition() { return loanCondition; }
    public void setLoanCondition(DeviceCondition loanCondition) { this.loanCondition = loanCondition; }

    public DeviceCondition getReturnCondition() { return returnCondition; }
    public void setReturnCondition(DeviceCondition returnCondition) { this.returnCondition = returnCondition; }

    public String getStartAtFormatted() {
        return startAt != null ? startAt.toLocalDateTime().toLocalDate().toString() : null;
    }

    public String getDueAtFormatted() {
        return dueAt != null ? dueAt.toLocalDateTime().toLocalDate().toString() : null;
    }

    public String getReturnedAtFormatted() {
        return returnedAt != null ? returnedAt.toLocalDateTime().toLocalDate().toString() : null;
    }

    public Integer getBinId() { return bin != null ? bin.getBinId() : null; }

    public Integer getLoanStatusId() { return loanStatus != null ? loanStatus.getLoanStatusId() : null; }

    public Long getCitizenId() { return citizen != null ? citizen.getUserId() : null; }

    public Long getEmployeeId() { return employee != null ? employee.getUserId() : null; }

    public Integer getLoanConditionId() { return loanCondition != null ? loanCondition.getDeviceConditionId() : null; }

    public Integer getReturnConditionId() { return returnCondition != null ? returnCondition.getDeviceConditionId() : null; }


    public static Bin createBinReference(Integer binId) {
        Bin bin = new Bin();
        bin.setBinId(binId);
        return bin;
    }

    public static LoanStatus createLoanStatusReference(Integer statusId) {
        LoanStatus status = new LoanStatus();
        status.setLoanStatusId(statusId);
        return status;
    }

    public static AppUser createUserReference(Long userId) {
        AppUser user = new AppUser();
        user.setUserId(userId);
        return user;
    }

    public static DeviceCondition createDeviceConditionReference(Integer conditionId) {
        DeviceCondition condition = new DeviceCondition();
        condition.setDeviceConditionId(conditionId);
        return condition;
    }
}