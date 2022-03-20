import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const WeChatAuth = ({ children }) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  useEffect(() => {
    if (
      player.id ||
      ["/test", "/", "/landing", "/logout"].includes(router.pathname)
    ) {
      console.log(router.pathname);
      return;
    } else router.push("/");
  }, []);
  return <>{children}</>;
};

export default WeChatAuth;
