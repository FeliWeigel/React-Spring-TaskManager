package com.example.taskmanager.security.auth;

import com.example.taskmanager.exceptions.UserNotFoundException;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> userRegister(@RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest);
    }

    @PostMapping("/login")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody AuthRequest authRequest){
        return new ResponseEntity<>(authService.login(authRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> userDeleteById(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.deleteById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(new UserNotFoundException("Error! User not found"), HttpStatus.NOT_FOUND);
    }
}