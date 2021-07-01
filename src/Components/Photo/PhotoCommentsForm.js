import React from "react";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        className={styles.textarea}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
