package com.example.demo;

import java.util.List;

import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
@SpringBootApplication
public class DemoApplication {
  @Autowired
  ScoreRepository scoreRepository;

  public static void main(String[] args) {
     SpringApplication.run(DemoApplication.class, args);
  }

  @ShellMethod("Saves a score to Cloud Datastore: save-book <userName> <userName> <score>")
  public String saveBook(String userName, String time, int score, String googleUid) {
     Score saveScore = this.scoreRepository.save(new Score(userName, time, score, googleUid));
     return saveScore.toString();
  }

  @ShellMethod("Loads all scores")
  public String findAllScores() {
     Iterable<Score> scores = this.scoreRepository.findAll();
     return Lists.newArrayList(scores).toString();
  }

  @ShellMethod("Loads scores by userName: find-by-userName <userName>")
  public String findByUserName(String userName) {
     List<Score> scores = this.scoreRepository.findByUserName(userName);
     return scores.toString();
  }

  @ShellMethod("Loads scores published after a given score: find-by-score-after <score>")
  public String findByScoreAfter(int score) {
     List<Score> scores = this.scoreRepository.findByScoreGreaterThan(score);
     return scores.toString();
  }

  @ShellMethod("Loads scores by userName and score: find-by-userName-score <userName> <score>")
  public String findByUserNameAndScore(String userName, int score) {
     List<Score> scores = this.scoreRepository.findByUserNameAndScore(userName, score);
     return scores.toString();
  }

  @ShellMethod("Removes all scores")
  public void removeAllScores() {
     this.scoreRepository.deleteAll();
  }
}
