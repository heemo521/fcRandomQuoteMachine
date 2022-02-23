import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';

// const quotes = [];
// const quote = {
//     _id: '',
//     content: '',
//     author: '',
// };

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
                    <CardTitle id="author">-{quoteData.author}</CardTitle>
                </CardBody>
                <CardFooter className="buttons">
                    <div id="tweet-quote">
                        <Button className="button" color="primary" href="twitter.com/intent/tweet">
                            <i className="fa fa-twitter"></i>Social Media Buttons
                        </Button>
                    </div>
                    <Button id="new-quote" color="primary" onClick={fetchQuote}>
                        New quote button
                    </Button>
                </CardFooter>
            </Card>
            {/* <div className="row">
                <div>
                    
                </div>
                <div id="author">- Author Name</div>
            </div>
            <div className="row">
                <div id="tweet-quote">
                    <a href="twitter.com/intent/tweet">
                        <i className="fa fa-twitter" />
                    </a>
                    Social Media Buttons
                </div>
                <Button id="new-quote">New quote button</Button>
            </div> */}
        </div>
    );
};

export default QuoteComponent;

// User Story #6: On first load, my quote machine displays a random quote in the element with id="text".

// User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author".

// User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.

// User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.

// User Story #10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.

// User Story #11: The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized.

// You can build your project by using this CodePen template and clicking Save to create your own pen. Or you can use this CDN link to run the tests in any environment you like: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js

// Once you're done, submit the URL to your working project with all its tests passing.

// Note: Twitter does not allow links to be loaded in an iframe. Try using the target="_blank" or target="_top" attribute on the #tweet-quote element if your tweet won't load. target="_top" will replace the current tab so make sure your work is saved.
