package com.chatbotbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chatbotbackend.model.Conversation;
import com.chatbotbackend.services.BotServices;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class BotController {

	@Autowired 
	BotServices services;
	
	 @PostMapping("backend/saveconversation")
	    public ResponseEntity<String> create(@RequestBody List<Conversation> list) {
	        services.saveConversation(list);
	        
	        return new ResponseEntity<>("Conversation saved successfully ",HttpStatus.CREATED);
	    }
	 
	 
	 @PostMapping("backend/getresponse")
	    public ResponseEntity<Conversation> getResponse(@RequestBody Conversation conversation) {
	        String response  = services.getResponse(conversation.getInput());
	        
	        conversation.setResponse(response);
	        
	        return new ResponseEntity<Conversation>(conversation,HttpStatus.OK);
	    }
	
}
