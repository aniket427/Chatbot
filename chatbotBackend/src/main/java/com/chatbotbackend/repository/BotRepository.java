package com.chatbotbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chatbotbackend.model.Conversation;

public interface BotRepository extends JpaRepository<Conversation, Integer>{

	
	@Query("select max(conversationId) as sequence from Conversation")
	public Integer findNextSequence();

	public List<Conversation> findByInput(String input);
	
}
