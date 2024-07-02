package co.edu.usa.talentotech.sga.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import co.edu.usa.talentotech.sga.jwt.JwtService;
import co.edu.usa.talentotech.sga.model.AuthResponse;
import co.edu.usa.talentotech.sga.model.LoginRequest;
import co.edu.usa.talentotech.sga.model.RegisterRequest;
import co.edu.usa.talentotech.sga.model.User;
import co.edu.usa.talentotech.sga.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user=userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token=jwtService.getToken(user);
        String userRole = ((User) user).getRol().toString();
        String email = ((User) user).getEmail().toString();
        String name = ((User) user).getName().toString();
        	return AuthResponse.builder()
                .token(token)
                .role(userRole)
                .email(email)
                .name(name)
                .build();

    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
        	.email(request.getEmail())
            .password(passwordEncoder.encode( request.getPassword()))
            .rol(request.getRol())
            .city(request.getCity())
            .name(request.getName())
            .build();

        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .email(request.getEmail())
            .role(request.getRol())
            .name(request.getName())
            .build();
        
    }

}
