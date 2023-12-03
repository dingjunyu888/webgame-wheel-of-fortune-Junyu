import react ,{useState, useEffect} from "react";
import axios from 'axios';
import './App.css';
import moment from "moment";

function ScoreBoard ({gameScore, user, userGameName}) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [userName, setUserName] = useState('');
    const [time, setTime] = useState('');
    const [score, setScore] = useState(0);
    const [id, setId] = useState('');

    function displayAllScores() {
        axios.get('https://wheel-of-fortune-406901.wl.r.appspot.com/findAllScores')
        .then(response => {
          setScores(response.data);  // Axios packs the response in a 'data' property
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    
    };

    function displayUserScores () {
        // event.preventDefault();
        // try {
        //     const response = axios.get(`https://wheel-of-fortune-406901.wl.r.appspot.com/findByGoogleUid?googleUid=${user.uid}`);
        //     setScores(response.data); // Update the books state with the search result
        //     setLoading(false);
        // } catch (error) {
        //     setError(error.message);
        //     setLoading(false);
        // }
        axios.get(`https://wheel-of-fortune-406901.wl.r.appspot.com/findByGoogleUid?googleUid=${user.uid}`)
        .then(response => {
          setScores(response.data);  // Axios packs the response in a 'data' property
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
      }

    
    function displayTopTenScores() {
        axios.get('https://wheel-of-fortune-406901.wl.r.appspot.com/findAllScores')
        .then(response => {
          setScores(response.data.sort((a, b) => b.score - a.score).slice(0, 10));  // Axios packs the response in a 'data' property
          setLoading(false);
          
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }


    // function setSubmitData() {
    //     setScore(gameScore);
    //     setUserName('Ankki');
    // }

    async function handleSubmit(event) {
        event.preventDefault();
        // setSubmitData();
        const postData = {
            userName: userGameName,
            time: moment().format("DD-MM-YYYY"),
            score: gameScore, 
            googleUid: user.uid
        };

        try {
            const response = await axios.post('https://wheel-of-fortune-406901.wl.r.appspot.com/saveScore', postData);
            console.log('Response:', response.data);
            displayAllScores()
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleDelete = (id) => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this score?");
  
        if (confirmDeletion) {
          // Send an HTTP DELETE request to delete the score
          axios
            .delete(`https://wheel-of-fortune-406901.wl.r.appspot.com/deleteById?id=${id}`)
            .then(response => {
              // Handle the success response
              console.log("Score deleted successfully");
              
              // Optionally, you can update the scores state to reflect the deleted score
              // Assuming scores is an array of scores in your state
              setScores(scores.filter(score => score.id !== id));
            })
            .catch(error => {
              // Handle any errors
              console.error("Error deleting score:", error);
            });
        }
    }

      // useEffect makes it so list of books shown when this component mounts
    useEffect(() => {
    // Using Axios to fetch data
   
        displayAllScores()
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
        <div>
            <div class="score-submit">
                <p>Player {userGameName} Have Score : {gameScore}</p>
                <p>Do  You  Want  To  Store  The  Game  Record?</p>
                <button onClick = {handleSubmit}>Submit Game Record</button>
            </div>
            <div class = "score-list">
                <div className="score-title">
                <p3>User Name</p3> 
                <p3> Date</p3>  
                <p3> Score</p3>
                </div>
                {scores.map(score => (
                    score.googleUid === user.uid ? (           
                        <div className="score-item" key={score.id}>
                            <p1>{score.userName}</p1> 
                            <p2> {score.time}</p2>
                            <p1> {score.score}</p1>
                            <button class="delete-button" onClick={() => handleDelete(score.id)}>delete</button>
                        </div>) : (                
                        <div className="score-item" key={score.id}>
                            <p1>{score.userName}</p1> 
                            <p2> {score.time}</p2>
                            <p1> {score.score}</p1>
                        </div>)
            ))}
                <div class = "score-buttons">
                    <button onClick = {displayTopTenScores}>Top 10</button>
                    <button onClick = {displayAllScores}>All Scores</button>
                    <button onClick = {displayUserScores}>User Scores</button>
                </div>
            </div>
        </div>
        
    );

}

export default ScoreBoard;