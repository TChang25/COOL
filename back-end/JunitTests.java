package com.example.prototypesetup;

import org.hibernate.annotations.TimeZoneStorage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.web.servlet.MockMvc;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import com.example.prototypesetup.entity.Loan;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.MediaType;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.hamcrest.Matchers.*;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

@AutoConfigureMockMvc


@SpringBootTest
class JunitTests {
    @Autowired
    private MockMvc mvc;
    private String baseUrl = "/api/loans";
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Test
    void testPostLoan() {
        try{
            CreateLoanRequest request = new CreateLoanRequest();
            request.setCitizenId(101L);
            request.setEmployeeId(3L);  
            request.setBinId(22);
            request.setLoanStatusId(1);
            request.setStartAt(java.time.LocalDate.of(2025, 9, 14));
            request.setDueAt(java.time.LocalDate.of(2025, 9, 21));
            request.setLoanConditionId(2);
            request.setLoanConditionNotes("Minor scratch on front right side of device");
            request.setNotes("DL was verified before checkout");    
            mvc.perform(post(baseUrl)
                    .contentType("application/json")
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.citizen_id").value(101))
                    .andExpect(jsonPath("$.employee_id").value(3))
                    .andExpect(jsonPath("$.status_id").value(1))
                    .andExpect(jsonPath("$.start_at").value("2025-09-14"))
                    .andExpect(jsonPath("$.due_at").value("2025-09-21"))
                    .andExpect(jsonPath("$.loan_condition").value(2))
                    .andExpect(jsonPath("$.loan_condition_notes").value("Minor scratch on front right side of device"))
                    .andExpect(jsonPath("$.notes").value("DL was verified before checkout"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    void testGetAllLoans() {
        try{
            mvc.perform(get(baseUrl)
                    .contentType("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith("application/json"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    @Test
    void testGetLoanById() {
        try{
            mvc.perform(get(baseUrl+"/1")
                    .contentType("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith("application/json"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    void testPutLoan() {
        try{
            ReplaceLoanRequest request = new ReplaceLoanRequest();
            request.setCitizenId(101L);
            request.setEmployeeId(3L);
            request.setBinId(22);
            request.setLoanStatusId(2);
            request.setStartAt(java.time.LocalDate.of(2025, 9, 14));
            request.setDueAt(java.time.LocalDate.of(2025, 9, 21));
            request.setLoanConditionId(3);
            request.setLoanConditionNotes("Updated condition details");
            request.setReturnConditionId(null);
            request.setReturnConditionNotes(null);
            request.setDamageFee(null);
            request.setAllAccessoriesReturned(false);
            request.setMissingAccessories("Charger missing");
            request.setNotes("Updated loan information");    
            mvc.perform(put(baseUrl+ "/1/return")
                    .contentType("application/json")
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.citizen_id").value(101))
                    .andExpect(jsonPath("$.employee_id").value(3))
                    .andExpect(jsonPath("$.bin_id").value(22))
                    .andExpect(jsonPath("$.status_id").value(2))
                    .andExpect(jsonPath("$.start_at").value("2025-09-14"))
                    .andExpect(jsonPath("$.due_at").value("2025-09-21"))
                    .andExpect(jsonPath("$.loan_condition").value(3))
                    .andExpect(jsonPath("$.loan_condition_notes").value("Updated condition details"))
                    .andExpect(jsonPath("$.All_accessories_returned").value(false))
                    .andExpect(jsonPath("$.missing_accessories").value("Charger missing"))
                    .andExpect(jsonPath("$.notes").value("Updated loan information"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
/*
 {
  "citizen_id": 101,
  "employee_id": 3,
  "device_id": 22,
  "status_id": 2,
  "start_at": "2025-09-14",
  "due_at": "2025-09-21",
  "loan_condition": 3,
  "loan_condition_notes": "Updated condition details",
  "return_condition": null,
  "return_condition_notes": null,
  "damage_fee": null,
  "all_accessories_returned": false,
  "missing_accessories": "Charger missing",
  "notes": "Updated loan information"
}
 */
    @Test
    void testPatchLoan() {
        try{
            UpdateLoanRequest request = new UpdateLoanRequest();
            request.setReturnedAt(java.time.LocalDate.of(2025, 9, 20));
            request.setReturnCondition(1);
            request.setReturnConditionNotes("Returned in excellent condition");
            request.setAllAccessoriesReturned(true);
            request.setNotes("Returned early with no signs of damage");
            mvc.perform(put(baseUrl+ "/1/return")
                    .contentType("application/json")
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.returned_at").value("2025-09-20"))
                    .andExpect(jsonPath("$.return_condition").value(1))
                    .andExpect(jsonPath("$.return_condition_notes").value("Returned in excellent condition"))
                    .andExpect(jsonPath("$.all_accessories_returned").value(true))
                    .andExpect(jsonPath("$.notes").value("Returned early with no signs of damage"));
            
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    void testDeleteLoan() {
        try{
            mvc.perform(delete(baseUrl+"/1")
                    .contentType("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith("application/json"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
/*
 {
  "returned_at": "2025-09-20",
  "return_condition": 1,
  "return_condition_notes": "Returned in excellent condition",
  "all_accessories_returned": true,
  "notes": "Returned early with no signs of damage"
}
 */
private class CreateLoanRequest {
        private Integer binId;
        private Integer loanStatusId;
        private Long citizenId;
        private Long employeeId;
        private java.time.LocalDate startAt;
        private java.time.LocalDate dueAt;
        private Integer loanConditionId;
        private String loanConditionNotes;
        private String notes;

        public Integer getBinId() { return binId; }
        public void setBinId(Integer binId) { this.binId = binId; }
        public Integer getLoanStatusId() { return loanStatusId; }
        public void setLoanStatusId(Integer loanStatusId) { this.loanStatusId = loanStatusId; }
        public Long getCitizenId() { return citizenId; }
        public void setCitizenId(Long citizenId) { this.citizenId = citizenId; }
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public java.time.LocalDate getStartAt() { return startAt; }
        public void setStartAt(java.time.LocalDate startAt) { this.startAt = startAt; }
        public java.time.LocalDate getDueAt() { return dueAt; }
        public void setDueAt(java.time.LocalDate dueAt) { this.dueAt = dueAt; }
        public Integer getLoanConditionId() { return loanConditionId; }
        public void setLoanConditionId(Integer loanConditionId) { this.loanConditionId = loanConditionId; }
        public String getLoanConditionNotes() { return loanConditionNotes; }
        public void setLoanConditionNotes(String loanConditionNotes) { this.loanConditionNotes = loanConditionNotes; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    private class UpdateLoanRequest {
        private Integer loanStatusId;
        private java.time.LocalDate returnedAt;
        private Integer returnCondition;
        private String returnConditionNotes;
        private BigDecimal damageFee;
        private Boolean allAccessoriesReturned;
        private String missingAccessories;
        private String notes;

        public Integer getLoanStatusId() { return loanStatusId; }
        public void setLoanStatusId(Integer loanStatusId) { this.loanStatusId = loanStatusId; }
        public java.time.LocalDate getReturnedAt() { return returnedAt; }
        public void setReturnedAt(java.time.LocalDate returnedAt) { this.returnedAt = returnedAt; }
        public Integer getReturnCondition() { return returnCondition; }
        public void setReturnCondition(Integer returnCondition) { this.returnCondition = returnCondition; }
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
    }

    private class ReplaceLoanRequest {
        private Integer binId;
        private Integer loanStatusId;
        private Long citizenId;
        private Long employeeId;
        private java.time.LocalDate startAt;
        private java.time.LocalDate dueAt;
        private java.time.LocalDate returnedAt;
        private Integer loanConditionId;
        private String loanConditionNotes;
        private Integer returnConditionId;
        private String returnConditionNotes;
        private BigDecimal damageFee;
        private Boolean allAccessoriesReturned;
        private String missingAccessories;
        private String notes;

        public Integer getBinId() { return binId; }
        public void setBinId(Integer binId) { this.binId = binId; }
        public Integer getLoanStatusId() { return loanStatusId; }
        public void setLoanStatusId(Integer loanStatusId) { this.loanStatusId = loanStatusId; }
        public Long getCitizenId() { return citizenId; }
        public void setCitizenId(Long citizenId) { this.citizenId = citizenId; }
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public java.time.LocalDate getStartAt() { return startAt; }
        public void setStartAt(java.time.LocalDate startAt) { this.startAt = startAt; }
        public java.time.LocalDate getDueAt() { return dueAt; }
        public void setDueAt(java.time.LocalDate dueAt) { this.dueAt = dueAt; }
        public java.time.LocalDate getReturnedAt() { return returnedAt; }
        public void setReturnedAt(java.time.LocalDate returnedAt) { this.returnedAt = returnedAt; }
        public Integer getLoanConditionId() { return loanConditionId; }
        public void setLoanConditionId(Integer loanConditionId) { this.loanConditionId = loanConditionId; }
        public String getLoanConditionNotes() { return loanConditionNotes; }
        public void setLoanConditionNotes(String loanConditionNotes) { this.loanConditionNotes = loanConditionNotes; }
        public Integer getReturnConditionId() { return returnConditionId; }
        public void setReturnConditionId(Integer returnConditionId) { this.returnConditionId = returnConditionId; }
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
    }

    private class LoanResponseDTO {
        private Integer loan_id;
        private Integer bin_id;
        private Integer loan_status_id;
        private String loan_status_name;
        private Long citizen_id;
        private Long employee_id;
        private String start_at;
        private String due_at;
        private String returned_at;
        private Integer loan_condition_id;
        private String loan_condition_name;
        private String loan_condition_notes;
        private Integer return_condition_id;
        private String return_condition_name;
        private String return_condition_notes;
        private BigDecimal damage_fee;
        private Boolean all_accessories_returned;
        private String missing_accessories;
        private String notes;
        private String created_at;
        private String updated_at;

        public LoanResponseDTO(Loan loan) {
            this.loan_id = loan.getLoanId();
            this.bin_id = loan.getBinId();
            this.loan_status_id = loan.getLoanStatusId();
            this.loan_status_name = loan.getLoanStatus() != null ? loan.getLoanStatus().getLoanStatusName() : null;
            this.citizen_id = loan.getCitizenId();
            this.employee_id = loan.getEmployeeId();
            this.start_at = loan.getStartAt() != null ? loan.getStartAt().toString() : null;
            this.due_at = loan.getDueAt() != null ? loan.getDueAt().toString() : null;
            this.returned_at = loan.getReturnedAt() != null ? loan.getReturnedAt().toString() : null;
            this.loan_condition_id = loan.getLoanConditionId();
            this.loan_condition_name = loan.getLoanCondition() != null ? loan.getLoanCondition().getDeviceConditionName() : null;
            this.loan_condition_notes = loan.getLoanConditionNotes();
            this.return_condition_id = loan.getReturnConditionId();
            this.return_condition_name = loan.getReturnCondition() != null ? loan.getReturnCondition().getDeviceConditionName() : null;
            this.return_condition_notes = loan.getReturnConditionNotes();
            this.damage_fee = loan.getDamageFee();
            this.all_accessories_returned = loan.getAllAccessoriesReturned();
            this.missing_accessories = loan.getMissingAccessories();
            this.notes = loan.getNotes();
            this.created_at = loan.getCreatedAt() != null ? loan.getCreatedAt().toString() : null;
            this.updated_at = loan.getUpdatedAt() != null ? loan.getUpdatedAt().toString() : null;
        }

        public Integer getLoan_id() { return loan_id; }
        public Integer getBin_id() { return bin_id; }
        public Integer getLoan_status_id() { return loan_status_id; }
        public String getLoan_status_name() { return loan_status_name; }
        public Long getCitizen_id() { return citizen_id; }
        public Long getEmployee_id() { return employee_id; }
        public String getStart_at() { return start_at; }
        public String getDue_at() { return due_at; }
        public String getReturned_at() { return returned_at; }
        public Integer getLoan_condition_id() { return loan_condition_id; }
        public String getLoan_condition_name() { return loan_condition_name; }
        public String getLoan_condition_notes() { return loan_condition_notes; }
        public Integer getReturn_condition_id() { return return_condition_id; }
        public String getReturn_condition_name() { return return_condition_name; }
        public String getReturn_condition_notes() { return return_condition_notes; }
        public BigDecimal getDamage_fee() { return damage_fee; }
        public Boolean getAll_accessories_returned() { return all_accessories_returned; }
        public String getMissing_accessories() { return missing_accessories; }
        public String getNotes() { return notes; }
        public String getCreated_at() { return created_at; }
        public String getUpdated_at() { return updated_at; }
    }

    private class ErrorResponse {
        private final String error;
        public ErrorResponse(String error) { this.error = error; }
        public String getError() { return error; }
    }

    private class SuccessResponse {
        private final String message;
        private final Object data;

        public SuccessResponse(String message) {
            this.message = message;
            this.data = null;
        }

        public SuccessResponse(String message, Object data) {
            this.message = message;
            this.data = data;
        }

        public String getMessage() { return message; }
        public Object getData() { return data; }
    }
}