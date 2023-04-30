import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../home.css";
import "../App.css";

function Home() {
  const languages = ["English", "Spanish", "French", "German", "Chinese"];
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  function handleChatSubmit(event) {
    event.preventDefault();
    const questionInput = event.target.elements.question;
    if (!questionInput) {
      console.error("Could not find question input element");
      return;
    }
    const question = questionInput.value;
    const prompt = ` ${question} in ${search} of ${city}, explain to me in ${preferredLanguage}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 200,
        n: 1,
        stop: ["\n", "Q:"],
      }),
    };
    console.log("Prompt:", prompt);
    fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const response =
          data.choices && data.choices.length > 0
            ? data.choices[0].text.trim()
            : "Sorry, I could not understand your question.";
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { question, response },
        ]);
        console.log("Question:", question);
        console.log("Response:", response);
      })
      .catch((error) => console.error(error));
  }

  const handleCustomMessageChange = (event) => {
    setCustomMessage(event.target.value);
  };

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Custom Message") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setPreferredLanguage(selectedOption);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchChange = (event) => {
    const selectedSearch = event.target.value;
    if (selectedSearch === "Custom Message") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setSearch(selectedSearch);
    }
  };

  return (
    <div id="my-div" className="background">
      <Card className="mx-auto my-5" style={{ width: "18rem" }}>
        <Form onSubmit={handleChatSubmit}>
          <Card.Body>
            <Card.Title>Search Your preference</Card.Title>
            <i className="fa-solid fa-location-dot"></i>
            <Form.Group controlId="preferredLanguage">
              <Form.Label>Preferred Language</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={handleOptionSelect}
              >
                <option disabled>Choose...</option>
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
                <option>Custom Message</option>
              </Form.Control>
              {isVisible && (
                <Form.Control
                  type="text"
                  placeholder="Enter custom message"
                  value={customMessage}
                  onChange={handleCustomMessageChange}
                />
              )}
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={handleCityChange}
              />
            </Form.Group>

            <Form.Group controlId="search">
              <Form.Label>Search</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={handleSearchChange}
              >
                {[
                  "Hotels",
                  "Restaurants",
                  "Movie Theatres",
                  "Grocery Stores",
                  "Petrol Bunks",
                  "Resorts",
                  "Garage",
                  "Custom Message",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Enter question" />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              style={{ margin: "10px", padding: "10px 20px" }}
            >
              Submit
            </Button>
            {chatHistory.map((chat) => (
              <div key={chat.question}>
                <div>
                  <strong>You:</strong> {chat.question}
                </div>
                <div>
                  <strong>ChatGPT:</strong> {chat.response}
                </div>
              </div>
            ))}
          </Card.Body>
        </Form>

        <div>
          {chatHistory.map((chat) => (
            <div key={chat.question}>
              <strong>You:</strong> {chat.question}
              <br />
              <strong>ChatGPT:</strong> {chat.response}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Home;

export const languages = ["English", "Spanish", "French", "German"];
