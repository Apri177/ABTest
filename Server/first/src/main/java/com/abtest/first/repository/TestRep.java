//package com.abtest.first.repository;
//
//import com.abtest.first.domain.Project;
//import com.abtest.first.domain.Test;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//import java.util.List;
//
//public interface TestRep extends MongoRepository<Test, Integer> {
//
//    // 프로젝트 내 모든 test 조회
//    List<Integer> getAllTests(Project project);
//
//    // 프로젝트 내 제목으로 test 조회
//    List<Integer> findByTitle(Project project, String title);
//
//}
