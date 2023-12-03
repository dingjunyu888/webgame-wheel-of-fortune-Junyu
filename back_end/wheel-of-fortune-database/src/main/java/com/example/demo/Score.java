package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "scores")
public class Score {
  @Id
  Long id;

  String userName;

  String time;

  int score;

  String googleUid;

  public Score(String userName, String time, int score, String googleUid) {
    this.userName = userName;
    this.time = time;
    this.score = score;
    this.googleUid = googleUid;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getUserName() {
  	return this.userName;
  }
  
  public void setUserName(String userName) {
  	this.userName=userName;
  }
   public String getTime() {
  	return this.time;
  }
  
  public void setTime(String time) {
  	this.time=time;
  }
  
  public int getScore() {
  	return this.score;
  }
  
  public void setScore(int score) {
  	this.score=score;
  }

  public String getGoogleUid() {
  	return this.googleUid;
  }
  
  public void setGoogleUid(String googleUid) {
  	this.googleUid=googleUid;
  }
  


  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", userName:'" + this.userName + '\'' +
        ", time:'" + this.time + '\'' +
        ", score:" + this.score +
        ", googleUid:" + this.googleUid +
        '}';
  }
}