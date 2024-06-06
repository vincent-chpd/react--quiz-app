import "./Quiz.css";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wait from "../assets/wait.mp3";
import wrong from "../assets/wrong.mp3";

export default function Quiz({
    data,
    setStop,
    questionNumber,
    setQuestionNumber,
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [playSound] = useSound(play);
    const [correctSound] = useSound(correct);
    const [wrongSound] = useSound(wrong);
    const [waitSound, { stop }] = useSound(wait);

    useEffect(() => {
        playSound();
        waitSound();
    }, [playSound, waitSound]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        setClassName("answer active");
        delay(3000, () =>
            setClassName(answer.correct ? "answer correct" : "answer wrong")
        );
        delay(5000, () => (answer.correct ? correctSound() : wrongSound()));
        delay(6000, () => {
            if (answer.correct) {
                setQuestionNumber((prev) => prev + 1);
                setSelectedAnswer(null);
            } else {
                stop();
                setStop(true);
            }
        });
    };

    return (
        <div className="quiz">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((answer) => (
                    <div
                        key={answer.text}
                        className={
                            selectedAnswer === answer ? className : "answer"
                        }
                        onClick={() => handleClick(answer)}
                    >
                        {answer.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
