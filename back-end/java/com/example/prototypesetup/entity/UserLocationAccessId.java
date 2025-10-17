package com.example.prototypesetup.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserLocationAccessId implements Serializable {

    private Long appUser;   // must match entity field name: appUser
    private Integer location;  // must match entity field name: location

    public UserLocationAccessId() {}

    public UserLocationAccessId(Long appUser, Integer location) {
        this.appUser = appUser;
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserLocationAccessId that = (UserLocationAccessId) o;
        return Objects.equals(appUser, that.appUser) &&
               Objects.equals(location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appUser, location);
    }
}
