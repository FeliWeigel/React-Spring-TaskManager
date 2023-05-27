package com.example.taskmanager.entities;

import com.example.taskmanager.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Data
@Entity
@Table(name = "tasks")
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private LocalDate expirationDate;
    private Boolean isCompleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
