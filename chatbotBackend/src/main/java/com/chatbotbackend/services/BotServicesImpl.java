package com.chatbotbackend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.chatbotbackend.model.Conversation;
import com.chatbotbackend.repository.BotRepository;

@Service
public class BotServicesImpl implements BotServices{

	@Autowired
	BotRepository botRepository;
	
	@Override
	public void saveConversation(List<Conversation> list) {	
		
		Integer value = botRepository.findNextSequence();
		
		int nextSequence = value != null ? value : 0;
		nextSequence++;
		
		
		for(Conversation conversationObj:list) {
			conversationObj.setConversationId(nextSequence);
		}
		
		botRepository.saveAll(list);
		
	}
	

	@Override
	public String getResponse(String input) {
		List<Conversation> response = botRepository.findByInput(input);
		
		if(response.isEmpty()) {
			return "Sorry. I did not understand this. Could you please rephrase your message?";
		}else {
			return response.get(response.size()-1).getResponse();
		}
		
	}
	
	
	

}
