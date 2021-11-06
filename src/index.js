import React from "react";
import ReactDOM from "react-dom";
import "./assests/style.css";
import Q from "./Q";
import QuestionBox from "./component/QuestionBox";
import Result from "./component/Result";

class Quiz extends React.Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };
    getQuestions = () => {
        Q().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    componentDidMount() {
        this.getQuestions();
    }
    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    };
    render() {
        return (<div className="container" >
            <div className="title" > Quiz </div> {
                this.state.questionBank.length > 0 &&
                this.state.responses < 5 &&
                this.state.questionBank.map(
                    ({ question, answers, correct, questionId }) => (
                        <QuestionBox question={question}
                            options={answers}
                            key={questionId}
                            selected={answer => this.computeAnswer(answer, correct)} />
                    )
                )}

            {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
        </div>
        );
    }
};

ReactDOM.render(< Quiz />, document.getElementById("root"));