




package com.nguyenvu.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nguyenvu.backend.entity.Feedback;
import com.nguyenvu.backend.repository.FeedbackRepository;
import com.nguyenvu.backend.service.FeedbackService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class FeedbackServiceImpl implements FeedbackService {
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId){
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedbackId);
        return optionalFeedback.get();
    }

     @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
@Override
      public Feedback updateFeedback(Feedback Feedback){
        Feedback existingFeedback = feedbackRepository.findById(Feedback.getId()).get();
        existingFeedback.setFistname(Feedback.getFistname());
        existingFeedback.setLastname(Feedback.getLastname());
        existingFeedback.setEmail(Feedback.getEmail());
        existingFeedback.setPhone_number(Feedback.getPhone_number());
        existingFeedback.setSubject_name(Feedback.getSubject_name());
        existingFeedback.setNote(Feedback.getNote());
        existingFeedback.setStatus(Feedback.getStatus());
        existingFeedback.setCreated_at(Feedback.getCreated_at());
        existingFeedback.setUpdated_at(Feedback.getUpdated_at());
        Feedback updateFeedback = feedbackRepository.save(existingFeedback);
        return updateFeedback;
    }

    @Override
    public void deleteFeedback(Long feedbackId){
        feedbackRepository.deleteById(feedbackId);
    }

}
