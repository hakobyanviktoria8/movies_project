import React, {useState, useEffect} from "react";
import {Row, Col} from 'reactstrap';
import "./Comment.css";

function CommentList({id}) {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);

    //keep locale storaje
    useEffect(() => {
        let localStorComment = JSON.parse(localStorage.getItem('Comments_' + id));
        localStorComment && setComments(localStorComment);
    }, []);

    //add locale storaje
    useEffect(() => {
        localStorage.setItem('Comments_' + id, JSON.stringify(comments));
    }, [comments]);

    const handleChange = event => {
        setInput(event.target.value);
    };

    //Add Comment
    const hendleAdd = (e) => {
        e.preventDefault();
        setComments([...comments, {id: Date.now(), text: input}]);
        setInput("");
    };

    //delete Comment
    const hendleDel = (id) => {
        setComments(comments.filter(item => item.id !== id))
    };

    return (
        <div className={"Comment"}>
            <hr/>
            <Row>
                <Col>
                    <h4>Write your Comments</h4>
                    <form action="" onSubmit={hendleAdd}>
                        <div>
                            <textarea rows={4} value={input} onChange={handleChange} placeholder={"Your comment"}/>
                        </div>
                        <button disabled={!input || input.trim().length === 0} type="submit">Add</button>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        comments && comments.map((item) => (
                            <div key={item.id} className={"oneComment"}>
                                <p>{item.text}</p>
                                <button className={"Delete"} type={"submit"} onClick={() => hendleDel(item.id)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                </Col>
            </Row>
        </div>
    )
}

export default CommentList