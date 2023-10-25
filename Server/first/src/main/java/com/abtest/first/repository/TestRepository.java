package com.abtest.first.repository;


import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public class TestRepository {

    // 해쉬맵을 사용한 저장 방식 -> MongoDB 컬렉션으로 직 변환
    @Autowired
    private MongoTemplate mongoTemplate;

    public void create(Test test) {
        mongoTemplate.insert(test);
    }

    public void edit(int projectId, String tname, Test test) {
        Query query = new Query();
        Update update = new Update();

        query.addCriteria(Criteria.where("projectId").is(projectId));
        query.addCriteria(Criteria.where("name").is(tname));

        update.set("name", test.getName());
        update.set("score", test.getScore());
        update.set("tester", test.getTester());
        update.set("testResult", test.getTestResult());
        update.set("updateDate", test.getUpdateDate());


        mongoTemplate.updateMulti(query, update, "tests");
    }

    public void delete(int projectId,String tname) {
        Query query = new Query();

        query.addCriteria(Criteria.where("name").is(tname));
        query.addCriteria(Criteria.where("projectId").is(projectId));

        mongoTemplate.remove(query, "tests");
    }

    public List<Test> findAll(int projectId) {
        Query query = new Query();

        query.addCriteria(Criteria.where("projectId").is(projectId));
        return mongoTemplate.find(query,Test.class);
    }

    public Test findById(int id,String tname) {
        Query query = new Query();

        query.addCriteria(Criteria.where("projectId").is(id));
        query.addCriteria(Criteria.where("name").is(tname));

        return mongoTemplate.findOne(query, Test.class);
    }
}
