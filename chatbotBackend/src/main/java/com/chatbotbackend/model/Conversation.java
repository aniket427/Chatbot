package com.chatbotbackend.model;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Conversation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int conversationId;
	private String input;
	private String response;
	private LocalDateTime timestamp;
}
