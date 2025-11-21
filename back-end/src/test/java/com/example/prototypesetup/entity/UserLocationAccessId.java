package com.example.prototypesetup.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserLocationAccessId implements Serializable {

    private Long appUser;     // Must match entity field name
    private Integer location; // Must match entity field name

    public UserLocationAccessId() {}

    public UserLocationAccessId(Long appUser, Integer location) {
        this.appUser = appUser;
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserLocationAccessId)) return false;
        UserLocationAccessId that = (UserLocationAccessId) o;
        return Objects.equals(appUser, that.appUser) &&
               Objects.equals(location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appUser, location);
    }
}
