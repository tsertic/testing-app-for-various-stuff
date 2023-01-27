import React, { useEffect, useRef, useState } from "react";
import { IComment } from "../../types";
import styles from "./Comments.module.scss";

const fetchCommentData = async (postId: string) => {
  return fetch(`/api/comments/${postId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data: { comments: IComment[] }) => {
      console.log(data);
      return data;
    });
};

export const Comments: React.FC<{ postId: string }> = ({ postId }) => {
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState<IComment[]>();
  console.log(postComments);
  useEffect(() => {
    fetchCommentData(postId).then((data) => {
      setPostComments(data.comments);
    });
  }, []);

  const showCommentsHandler = () => {
    setShowComments(!showComments);
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailRef.current, nameRef.current, commentRef.current);
    if (!emailRef.current || !nameRef.current || !commentRef.current) {
      //alert that all fields must be filled
      console.log("niej sve dobro");
      return;
    }
    const emailValue = emailRef.current.value;
    const nameValue = nameRef.current.value;
    const commentValue = commentRef.current.value;
    const commentObject = {
      email: emailValue,
      name: nameValue,
      comment: commentValue,
      postId: postId,
      commentId: Math.random().toString(),
    };
    console.log(commentObject);
    fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentObject),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCommentData(postId).then((data) => {
          setPostComments(data.comments);
        });
      });
  };

  return (
    <div className={styles.comments}>
      <div className={styles["comments-button__container"]}>
        <button onClick={showCommentsHandler}>Show Comments</button>
      </div>
      {showComments && (
        <div className={styles["comments-modal"]}>
          <form className={styles.form} onSubmit={handleSubmitComment}>
            <div
              className={`${styles["input-container"]} ${styles["half-input"]}`}
            >
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" ref={emailRef} />
            </div>
            <div
              className={`${styles["input-container"]} ${styles["half-input"]}`}
            >
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" ref={nameRef} />
            </div>

            <div
              className={`${styles["input-container"]} ${styles["full-input"]}`}
            >
              <label htmlFor="comment">Your comment</label>
              <textarea
                name=""
                id="comment"
                cols={30}
                ref={commentRef}
                rows={10}
              ></textarea>
            </div>
            <button>Submit</button>
          </form>
          <div className={styles["comments-list__container"]}>
            <ul className={styles["comments-list"]}>
              {postComments &&
                postComments.map((comment) => {
                  return (
                    <li key={comment.commentId}>
                      <p>{comment.comment}</p>
                      <p className={styles["comment-name"]}>
                        <i>By:</i> {comment.name}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
