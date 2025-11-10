package com.COOL.userapi;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class User {

    @Id
    private String app_user_id;

    private String app_user_full_name;
    private String email;
    private String password_hash;
    private String user_role_id;

    // Getters and setters

    public String getApp_user_id() {
        return app_user_id;
    }

    public void setApp_user_id(String app_user_id) {
        this.app_user_id = app_user_id;
    }

    public String getApp_user_full_name() {
        return app_user_full_name;
    }

    public void setApp_user_full_name(String app_user_full_name) {
        this.app_user_full_name = app_user_full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getUser_role_id() {
        return user_role_id;
    }

    public void setUser_role_id(String user_role_id) {
        this.user_role_id = user_role_id;
    }
}