import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { faHeart as SoildHeart } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;
const PhotoContainer = styled.div`
  block-size: fit-content;
  /* border: 1px solid ${(props) => props.theme.borderColor}; */
  width: 459px;
`;
const PhotoHeader = styled.div`
  height: 56px;
  margin-top: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Username = styled.span`
  margin-left: 13px;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: bold;
`;
const UserNameDiv = styled.div`
  height: 25px;
`;
const PhotoFile = styled.img`
  width: 459px;
  height: 459px;
  border-radius: 20px;
`;
const PhotoData = styled.div``;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  display: flex;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-left: 11px;
  font-family: NotoSans;
  font-size: 20px;
  font-weight: bold;
`;
const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`;
function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
      // cache.writeFragment({
      //   id: photoId,
      //   fragment: gql`
      //     fragment BSName on Photo {
      //       isLiked
      //       likes
      //     }
      //   `,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1,
      //   },
      // });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike, // direct link to apollo cache
    // refetchQueries: [{ query: FEED_QUERY }], // call a  query agin(indirects)
  });
  console.log(user);
  return (
    <PhotoContainer key={id}>
      <PhotoFile src={file} />
      <PhotoHeader>
        <AvatarDiv>
          <Link to={`/users/${user.userName}`}>
            <Avatar lg url={user.avatar} />
          </Link>{" "}
          <UserNameDiv>
            <Link to={`/users/${user.userName}`}>
              <Username>{user.userName}</Username>
            </Link>{" "}
          </UserNameDiv>
        </AvatarDiv>
        <PhotoAction onClick={toggleLikeMutation}>
          <FontAwesomeIcon
            style={{ color: isLiked ? "#FF6E7F" : "inherit" }}
            size={"lg"}
            icon={isLiked ? SoildHeart : faHeart}
          />
          <Likes>{likes === 1 ? "1" : `${likes} `}</Likes>
        </PhotoAction>
      </PhotoHeader>
      <PhotoData>
        <Comments
          photoId={id}
          author={user.userName}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number,
};
export default Photo;
