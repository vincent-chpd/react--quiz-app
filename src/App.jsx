import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import data from "./Data";
import Start from "./components/Start";

function App() {
    const [username, setUsername] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("£ 0");

    const moneyPyramid = useMemo(
        () =>
            [
                { id: 1, amount: "£ 100" },
                { id: 2, amount: "£ 200" },
                { id: 3, amount: "£ 300" },
                { id: 4, amount: "£ 500" },
                { id: 5, amount: "£ 1,000" },
                { id: 6, amount: "£ 2,000" },
                { id: 7, amount: "£ 4,000" },
                { id: 8, amount: "£ 8,000" },
                { id: 9, amount: "£ 16,000" },
                { id: 10, amount: "£ 32,000" },
                { id: 11, amount: "£ 64,000" },
                { id: 12, amount: "£ 125,000" },
                { id: 13, amount: "£ 250,000" },
                { id: 14, amount: "£ 500,000" },
                { id: 15, amount: "£ 1 MILLION" },
            ].reverse(),
        []
    );

    useEffect(() => {
        questionNumber > 1 &&
            setEarned(
                moneyPyramid.find((money) => money.id === questionNumber - 1)
                    .amount
            );
    }, [moneyPyramid, questionNumber]);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="app">
            {username ? (
                <>
                    <div className="main">
                        {stop ? (
                            <h1 className="endText ">You earned: {earned}</h1>
                        ) : (
                            <>
                                <div className="top">
                                    <div className="timer">
                                        <Timer
                                            setStop={setStop}
                                            questionNumber={questionNumber}
                                        />
                                    </div>
                                </div>
                                <div className="bottom">
                                    <Quiz
                                        data={data}
                                        setStop={setStop}
                                        questionNumber={questionNumber}
                                        setQuestionNumber={setQuestionNumber}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pyramid">
                        <h1 className="username">
                            Player: {capitalize(username)}
                        </h1>
                        <ul className="moneyList">
                            {moneyPyramid.map((item) => (
                                <li
                                    key={item.id}
                                    className={
                                        questionNumber === item.id
                                            ? "moneyListItem active"
                                            : "moneyListItem"
                                    }
                                >
                                    <span className="moneyListItemNumber">
                                        {item.id}
                                    </span>
                                    <span className="moneyListItemAmount">
                                        {item.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Start setUsername={setUsername} />
            )}
        </div>
    );
}

export default App;
