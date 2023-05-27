package com.example.taskmanager.security.jwt;

import com.example.taskmanager.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Table(name = "tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String token;
    public Boolean revoked;
    public Boolean expired;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
