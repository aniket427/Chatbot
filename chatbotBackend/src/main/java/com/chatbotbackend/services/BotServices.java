package com.chatbotbackend.services;

import java.util.List;

import com.chatbotbackend.model.Conversation;


public interface BotServices {

	public void saveConversation(List<Conversation> list);
	
	public String getResponse(String input);
	

}
