import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
// import classes from './QuoteComponent.module.css';

// Adding CSS Styling
// Add Social Media button to share on twitter
// Auto-change quotes

//User Story #5: Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote".
// User Story #10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.

const QuoteComponent = (props) => {
    const [quoteData, setQuoteData] = useState(null);

    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const { statusCode, statusMessage, ...data } = await response.json();
            if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
            setQuoteData(data);
        } catch (error) {
            // If the API request failed, log the error to console and update state
            // so that the error will be reflected in the UI.
            console.error(error);
            setQuoteData({ content: 'Opps... Something went wrong' });
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    if (!quoteData) return null;

    return (
        <div className="container" id="quote-box">
            <Card>
                <CardBody>
                    <CardText>
                        <i class="fa fa-quote-left"> </i>
                        <div id="text">{quoteData.content}</div>
                    </CardText>
                    <CardTitle id="author">- {quoteData.author}</CardTitle>
                </CardBody>
                <CardFooter className="buttons">
                    <div>
                        <a className="button" color="primary" href="twitter.com/intent/tweet" id="tweet-quote">
                            <i className="fa fas-twitter"></i>
                            Social Media Buttons
                        </a>
                    </div>
                    <Button id="new-quote" color="primary" onClick={fetchQuote}>
                        New quote button
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default QuoteComponent;
