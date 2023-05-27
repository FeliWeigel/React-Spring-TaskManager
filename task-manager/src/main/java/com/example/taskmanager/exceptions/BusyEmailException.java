package com.example.taskmanager.exceptions;

public class BusyEmailException extends RuntimeException{
    public BusyEmailException(String message){
        super(message);
    }
}
