import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import React from "react";

import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import sanitizeHtml from "sanitize-html";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

function Comment({ id, author, payload, isMine, photoId }) {
  const cleanedPayload = sanitizeHtml(payload, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        <React.Fragment key={id}>{cleanedPayload}</React.Fragment>
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
const CommentContainer = styled.div`
  button {
    background-color: inherit;
    border: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Comment;
