package com.abtest.first.service;

import com.abtest.first.domain.Test;
import com.abtest.first.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;

    public void createTest(Test test) { testRepository.create(test);}

    public void editTest(int id, String name, String password, int maxParticipants) {
        Test test = testRepository.findById(id);

        if(test == null) {
            System.out.println("프로젝트를 찾을 수 없습니다.");
            return;
        }

        if(!test.getPassword().equals(password)) {
            System.out.println("비밀번호가 틀렸습니다.");
            return;
        }

        test.setName(name);
        test.setMaxParticipants(maxParticipants);

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm MM/dd"));
        test.setUpdateDate(formattedDate);

        testRepository.edit(id, test);
    }


    public void deleteTest(int id, String password) {
        Test test = testRepository.findById(id);

        if(!test.getPassword().equals(password)) {
            System.out.println("비밀번호가 틀렸습니다.");
            return;
        }

        testRepository.delete(id);
    }

    public List<Test> getAllTests() { return testRepository.findAll(); }

    public Test getTest(int id) {
        return testRepository.findById(id);
    }

}