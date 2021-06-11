import {Form, Button} from "react-bootstrap";
import React, {useState} from "react";
import Navbar from './Navbar';
import {useHistory} from "react-router-dom";
import '../css/NewQuestion.css';

const NewQuestion = () => {
  // new question form page
  // accessible only to signed in users (private route used)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const history = useHistory();

  // function to update keywords
  function updateKeywords(e) {
    // prevent default button behavior and page refresh on button click
    e.preventDefault();
    // check if keyword has already been added
    if (!keywords.includes(keyword.toLowerCase())) {
      // if not, push after converting to lower case to obliterate
      // keyword differences due to lower case and upper case letters
      // (better keyword filtered search)
      keywords.push(keyword.toLowerCase());
    }
    // empty up keyword insertion box
    setKeyword("");
  }

  function clearKeywords(e) {
    e.preventDefault();
    // clear keyword list
    setKeywords([]);
    setKeyword("");
  }

  function submitQuestion() {
    // submit question
    const question = { title: title, body: body, keywords: keywords };
    const token = localStorage.getItem('REACT_TOKEN_AUTH');
    fetch('http://localhost:8003/create/', {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": "Bearer "+ JSON.parse(token) },
      body: JSON.stringify(question)
      })
      .then(function (res) {
            if (res.status === 200) {
              // show message and redirect to browse page
              alert('Question successfully uploaded!');
              history.push('/browse');
            // error handling
            } else if (res.status === 401) {
              console.log('401 Unauthorized Error');
              alert('Your session expired. Please login again.');
              localStorage.removeItem('REACT_TOKEN_AUTH');
              history.push('/login');
            } else if (res.status === 400) {
              console.log('400 Bad Request');
              alert('Posting of question failed, please try again.');
            } else {
              console.log('500 Internal Server Error');
              history.push('/error-500');
            }
          }
      );
  }

  return (
    <div>
      <Navbar/>
      <div className="new-question">
        <div className="description">
          <h3> <b>  Make your own question! 💬 </b> </h3>
          <p>
            Here you can ask your own questions to get all the answers you need.
            Don't forget to <b>add a title to your question</b>, as well as
            <br/>the necessary <b>keywords </b> to make sure your question gets
            all the attention it deserves!
          </p>
        </div>
        {/* new question form */}
        <Form className="new-question-form">
          <Form.Group>
            <Form.Label className="label"> Question Title: </Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Text className="text-muted">
              We advise you to keep your title short and descriptive.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label> Question Body: </Form.Label>
            <textarea
              id="text-box"
              rows="8" cols="100"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
          {/* display so far added keywords */}
          <ul>
              {keywords.map(keyword => (
              <li className="keyword" key={keyword}>{keyword}</li>
              ))}
          </ul>
          <div className="input-group">
            <Form.Label className="label"> Keyword: </Form.Label>
            <Form.Control
              placeholder="Enter keyword"
              id= "keyword-box"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {/* add keyword and clear all keywords buttons */}
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={(e) => updateKeywords(e)}
            >
              add keyword
            </button>
            <button
              className="btn btn-outline-dark btn-sm"
              id="btn-keyword"
              onClick={(e) => clearKeywords(e)}
            >
              clear all keywords
            </button>
          </div>
          {/* question submit button */}
          <Button
            id="btn-submit"
            variant="dark"
            onClick={() => submitQuestion()}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewQuestion;
