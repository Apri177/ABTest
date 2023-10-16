package com.abtest.first.repository;


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

    private Query query;
    private Update update;

    private static int sequence = 0;

    public void create(Test test) {
        test.setId(++sequence);
        mongoTemplate.insert(test);
    }

    public void edit(int id, Test test) {
        query.addCriteria(Criteria.where("id").is(id));

        update.set("name", test.getName());
//        update.set("maxParticipants", test.getMaxParticipants());
//        update.set("imageFiles1", test.getImageFiles1());
//        update.set("imageFiles2", test.getImageFiles2());
//        update.set("updateDate", test.getUpdateDate());

        mongoTemplate.updateMulti(query, update, "tests");
    }

    public void delete(int id) {
        query.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.remove(query, "tests");
    }

    public List<Test> findAll() { return mongoTemplate.findAll(Test.class); }

    public Test findById(int id) { return mongoTemplate.findById(id, Test.class); }
}
