import styled from "styled-components";
import User from "./User.svg";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "48px" : props.profile ? "150px" : "60px")};
  height: ${(props) => (props.lg ? "48px" : props.profile ? "150px" : "60px")};
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Img = styled.img``;
const GradientDiv = styled.div`
  width: ${(props) => (props.lg ? "56px" : props.profile ? "166px" : "70px")};
  height: ${(props) => (props.lg ? "56px" : props.profile ? "166px" : "70px")};
  --b: ${(props) => (props.profile ? "4px" : "2px")}; /* border width*/
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  &:after {
    content: "";
    display: inline-block;
    padding-top: 100%;
  }
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(
      --c,
      radial-gradient(100% 100% at 54.72% 0%, #ff6e7f 0%, #bfe9ff 100%)
    );
    padding: var(--b);
    border-radius: 50%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;
function Avatar({ url = "", lg = false, profile = false }) {
  return (
    <GradientDiv lg={lg} profile={profile}>
      <SAvatar lg={lg} profile={profile}>
        {url !== "" ? <Img src={url} /> : null}
      </SAvatar>
    </GradientDiv>
  );
}

export default Avatar;
