import React from "react";
import Img from "../Image/Img";
import Button from "../Button/Button";
const Badge = (props) => {
  const {className,badgeReceived,badgeTodo} = props;
  return (
    <div className={className}>
      <Img {...getBadge(badgeReceived)} />
      <Button
        size="m"
        active={badge.todo === 0}
        color={badge.todo === 0 ? "gold" : "gray"}
        className={classes.btn}
        onClick={badge.todo === 0 ? getCertificateOneHandler : null}
      >
        {badge.todo === 0 ? "领取证书" : "未验证"}
      </Button>
      <Img
        {...getAvatar(player.avatar ?? 2)}
        className={classNames(classes.avatar, avatarClassName || classes.baby)}
      />
    </div>
  );
};

export default Badge;
