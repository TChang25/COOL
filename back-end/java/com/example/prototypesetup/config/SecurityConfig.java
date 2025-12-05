package com.example.prototypesetup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
// CORS related imports
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays; // Needed for Arrays.asList

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final RsaKeyProperties rsaKeys;
    
    public SecurityConfig(RsaKeyProperties rsaKeys) {
        this.rsaKeys = rsaKeys;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults()) // 1. Add CORS configuration here
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/user-roles/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers("/api/app-users/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.POST, "/api/locations/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.PUT, "/api/locations/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.DELETE, "/api/locations/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.POST, "/api/devices/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.PUT, "/api/devices/**").hasAuthority("SCOPE_Admin")
                        .requestMatchers(HttpMethod.DELETE, "/api/devices/**").hasAuthority("SCOPE_Admin")
                        .anyRequest().hasAnyAuthority("SCOPE_Admin", "SCOPE_Employee")
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                    .jwt(Customizer.withDefaults())
                    .bearerTokenResolver(cookieBearerTokenResolver())
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    // 2. Define the CorsConfigurationSource bean
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // --- Configure Allowed Origins ---
        // Change "http://localhost:3000" to match your frontend's address. 
        // Use a specific domain instead of "*" if allowCredentials is true (which is recommended for cookies).
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        
        // --- Configure Allowed Methods ---
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // --- Configure Allowed Headers ---
        // Allow all headers, which is often necessary for Authorization/Content-Type.
        configuration.setAllowedHeaders(Arrays.asList("*")); 
        
        // --- Important for JWT in Cookies ---
        // Must be 'true' for the browser to send cookies, HTTP authentication, and client-side SSL certificates.
        configuration.setAllowCredentials(true); 
        
        // Set the maximum age for preflight OPTIONS requests (3600 seconds = 1 hour)
        configuration.setMaxAge(3600L); 
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all paths (/**)
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }

    @Bean
    public BearerTokenResolver cookieBearerTokenResolver() {
        return new BearerTokenResolver() {
            @Override
            public String resolve(HttpServletRequest request) {
                if (request.getCookies() != null) {
                    for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                        if ("jwt-token".equals(cookie.getName())) {
                            return cookie.getValue();
                        }
                    }
                }
                return null;
            }
        };
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.publickey()).build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeys.publickey()).privateKey(rsaKeys.privatekey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }
}