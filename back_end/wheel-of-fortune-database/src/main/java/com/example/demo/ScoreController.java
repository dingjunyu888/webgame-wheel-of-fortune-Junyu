package com.example.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ScoreController {
  private final ScoreRepository scoreRepository;

  public ScoreController(ScoreRepository scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  @PostMapping("/saveScore")
  @CrossOrigin(origins = "*")
  public String saveScore(@RequestBody Score score) {
    if (score == null) {
      return "The score is invalid";
    }
    this.scoreRepository.save(score);
    return "success";
  }
  
  

  @GetMapping("/findAllScores")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Score> findAllScores() {
  	Iterable<Score> scores = this.scoreRepository.findAll();
    List<Score> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }
  /*public String findAllScores() {
    Iterable<Score> scores = this.scoreRepository.findAll();
    List<Score> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scores.toString();
    
  } */
  @GetMapping("/findByGoogleUid")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Score> findByGoogleUid(@RequestParam String googleUid) {
      return this.scoreRepository.findByGoogleUid(googleUid);
  }


  @DeleteMapping("/deleteById")
  @CrossOrigin(origins = "*")
  public ResponseEntity<String> deleteById(@RequestParam Long id) {
      // Check if the score with the given ID exists
      Optional<Score> scoreOptional = this.scoreRepository.findById(id);

      if (scoreOptional.isPresent()) {
          // Score with the given ID exists, delete it
          this.scoreRepository.deleteById(id);
          return ResponseEntity.ok("Score successfully deleted");
      } else {
          // Score with the given ID not found, return a 404 response
          return ResponseEntity.notFound().build();
      }
  }
}