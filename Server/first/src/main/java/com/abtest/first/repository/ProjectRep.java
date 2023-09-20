//package com.abtest.first.repository;
//
//
//import com.abtest.first.domain.Project;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//import java.util.List;
//
//public interface ProjectRep extends MongoRepository<Project, Integer> {
//
//    // 모든 프로젝트 조회 (메인)
//    List<Project> getAllProject();
//
//    // 제목으로 검색
//    List<Project> findByTitle(String title);
//
//
//
//
//
//}
