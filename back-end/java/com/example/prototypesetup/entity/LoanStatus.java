package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_status")
public class LoanStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_status_id")
    private Integer loanStatusId;

    @Column(name = "loan_status_name", nullable = false, unique = true, length = 50)
    private String loanStatusName;

    
    public LoanStatus() {}

    public Integer getLoanStatusId() { return loanStatusId; }
    public void setLoanStatusId(Integer loanStatusId) { this.loanStatusId = loanStatusId; }

    public String getLoanStatusName() { return loanStatusName; }
    public void setLoanStatusName(String loanStatusName) { this.loanStatusName = loanStatusName; }
}
