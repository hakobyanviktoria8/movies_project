import React, {useState, useEffect} from "react";
import {Row, Col} from 'reactstrap';
import "./Comment.css";

function CommentList({id}) {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);
    const [editComments, setEditComments] = useState("");
    const [bool,setBool] = useState(false);

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

    //Edit Comment
    const hendleEdit = (id) => {
        // setComments(comments.map(item => {
        //     if (item.id === id) {
        //         setEditComments(item.text);
        //
        //         console.log("hendleEdit",id,item.text,bool)
        //     }
        // }));

        comments.map(item=>{
            if (item.id === id) {
                setEditComments(item.text);

                console.log("hendleEdit",id,item.text,bool)
            }
        });
        setBool(!bool);
    };

    //handleEditComment
    const handleEditComment = event => {
        setEditComments(event.target.value);
    };

    const handleSave = (event) =>{
        setInput(event.target.value)
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
                                <textarea style={{display: bool? "block":"none"}} value={editComments} onChange={handleEditComment}/>
                                <button style={{display: bool? "block":"none"}} className={"Edit"} type={"submit"} onClick={() => handleSave(item.id)}>
                                    Save
                                </button>
                                <p>{bool ? "" : item.text}</p>
                                <button className={"Delete"} type={"submit"} onClick={() => hendleDel(item.id)}>
                                    Delete
                                </button>
                                <button className={"Edit"} type={"submit"} onClick={() => hendleEdit(item.id)}>
                                    Edit
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