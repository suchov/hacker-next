const Comment = ({ comment }) =>
  console.log(comment) || (
    <div className="comment">
      <div className="commment-user">{comment.user}</div>
      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
    </div>
  );

export default Comment;
