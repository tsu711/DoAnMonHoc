package com.nguyenvu.backend.service;


import com.nguyenvu.backend.entity.Feedback;

import java.util.List;


public interface FeedbackService {
    Feedback createFeedback(Feedback feedback);
    Feedback getFeedbackById(Long feedbackId);
    List<Feedback> getAllFeedbacks();
    Feedback updateFeedback(Feedback feedback);
    void deleteFeedback(Long feedbackId);

}