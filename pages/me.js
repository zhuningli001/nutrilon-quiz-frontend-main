import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";

import Bg from "../component/ui/Background/Bg";
import Nav from "../component/ui/Header/Nav";
import Button from "../component/ui/Button/Button";
import classNames from "../lib/classNames";

import classes from "../styles/Me.module.scss";
import StatusBar from "../component/ui/StatusBar/StatusBar";
import LevelRing from "../component/ui/LevelRing/LevelRing";
import useScreenSize from "../hooks/useScreenSize";
import Img from "../component/ui/Image/Img";
import { getAvatar, getBadge } from "../lib/brandAssets";
import { syncPlayerData } from "../store/playerSlice";
import { uiActions } from "../store/uiSlice";

// To Do
const ASSET_LINKS = [
  "https://www.dropbox.com/sh/k1d395e1kurtmth/AACubgqmV99HevT69d7TALQOa?dl=0",
  "https://www.dropbox.com/sh/j99bhuklhkasfte/AACyAphrMJLf2zhU_YRs6QCQa?dl=0",
  "https://www.dropbox.com/sh/nsmmx8t0479oyh4/AABEOCKorbJrc_UFimrL80w_a?dl=0",
  "https://www.dropbox.com/sh/lnaagm1v4mnwl8y/AACj6zAblcidUXLyT-H7xZy6a?dl=0",
  // To be added
  "https://www.dropbox.com/sh/t372bxa36wyyyf2/AAB7X7KB04AGfSugVqkMD56ka?dl=0",
];

const Me = () => {
  const player = useSelector((state) => state.player);
  // To Do
  const { lastCertificateDate } = player;
  const dispatch = useDispatch();

  const [levels, setLevels] = useState([]);
  useEffect(() => {
    setLevels(
      [0, 1, 2, 3, 4].map((index) =>
        index < player.currentLevel ? "active" : "inactive"
      )
    );
  }, [player.currentLevel]);

  const goToAssets = (index) => {
    window.location.assign(ASSET_LINKS[index]);
  };

  const { width } = useScreenSize();

  // only for level 1-4 : certificate 1
  const [badge, setBadge] = useState({ received: 0, todo: 4 });

  //  For now only assume 5 levels:
  // assume level 1-4: 4 collections to get one badge;
  // level 5: one more 'collection'/level to get another badge.
  useEffect(() => {
    if (player.currentLevel <= 4) {
      setBadge({
        received: player.currentLevel,
        todo: 4 - player.currentLevel,
      });
    } else {
      setBadge({
        received: 4,
        todo: 0,
      });
    }
  }, [player.currentLevel]);

  const [avatarClassName, setAvatarClassName] = useState(classes.mom);
  useEffect(() => {
    setAvatarClassName([classes.mom, classes.dad, classes.baby][player.avatar]);
  }, [player.avatar]);

  const editProfileHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "?????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????\r\n??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        qrcode: true,
        handler: "close",
      })
    );
  };

  const getCertificateHandler = (cohort) => {
    const certifiedDate = Date();
    console.log(player.certificates[0]?.date || "test date");
    try {
      (async () => {
        await dispatch(
          syncPlayerData({
            // lastCertificateDate originally designed only for first badge
            lastCertificateDate: lastCertificateDate
              ? lastCertificateDate
              : certifiedDate,
            certificates: [
              ...player.certificates,
              {
                date: player.certificates[0]?.date || certifiedDate,
                cohort: cohort,
              },
            ],
          })
        );
      })();
    } catch (error) {
      console.error(error);
    }

    // dispatch notification and website link
    dispatch(uiActions.showSync());
    setTimeout(() => {
      dispatch(uiActions.hideSync());
      dispatch(
        uiActions.showNotification({
          title:
            player.certificates[0]?.cohort > 1
              ? "???????????????????????????????????????"
              : "?????????",
          text: "????????????????????????????????????????????????",
          handler: "goToVerify",
        })
      );
    }, 5000);
  };

  const getCertificateOneHandler = () => {
    getCertificateHandler(1);
  };
  // actually the 'certificate' is a badge
  const getCertificateTwoHandler = () => {
    getCertificateHandler(2);
  };
  const exitHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "????????????????????????????????????",
        qrcode: true,
        handler: "logout",
      })
    );
  };

  return (
    <>
      <Bg />
      <Nav
        title="????????????"
        containerClassName={classes.nav}
        className={classes.heading}
        rightIcon="/icons/icon-pen.svg"
        rightAlt="icon of pen"
        rightClickHandler={editProfileHandler}
      />

      <section className={classes.info}>
        <Button
          className={classes.profile}
          src={
            player.headimgurl ||
            "https://res.cloudinary.com/npc2021/image/upload/v1633443295/default_profile_image_3109ee6c17.jpg"
          }
          color="white"
          type="circle"
          ring={false}
        />
        <h2>{player.nickname}</h2>
        <div className={classes.status}>
          <StatusBar title="?????????" status={player.scoreTotal} />
          <StatusBar title="?????????" status={player.life} />
        </div>
      </section>

      <section className={classes.asset}>
        <h3>????????????</h3>
        <p>?????????????????????????????????????????????</p>
        <motion.div
          drag="x"
          dragConstraints={{ left: -720 + width, right: 0 }}
          className={classes.levels}
        >
          <LevelRing
            level={0}
            status={levels[0]}
            text="????????????"
            className={classes.level}
            onClick={levels[0] === "active" ? goToAssets.bind(null, 0) : null}
          />
          <LevelRing
            level={1}
            status={levels[1]}
            text="????????????"
            className={classes.level}
            onClick={levels[1] === "active" ? goToAssets.bind(null, 1) : null}
          />
          <LevelRing
            level={2}
            status={levels[2]}
            text="?????????"
            className={classes.level}
            onClick={levels[2] === "active" ? goToAssets.bind(null, 2) : null}
          />
          <LevelRing
            level={3}
            status={levels[3]}
            text="???????????????"
            className={classes.level}
            onClick={levels[3] === "active" ? goToAssets.bind(null, 3) : null}
          />
          <LevelRing
            level={4}
            status={levels[4]}
            text="????????????"
            className={classes.level}
            onClick={levels[4] === "active" ? goToAssets.bind(null, 4) : null}
          />
        </motion.div>
      </section>

      {/* To do: list of badges */}
      <section className={classes.puzzle}>
        <h3>????????????????????????</h3>
        {player.currentLevel <= 4 && (
          <p>???????????????{badge.received}???????????????</p>
        )}
        {/* To Do */}
        {/* level 1-4 */}
        {player.currentLevel <= 4 && badge.todo !== 0 && (
          <p>??????{badge.todo}???????????????????????????</p>
        )}
        {/* passing Level 5 */}
        {player.currentLevel == 5 && <p>?????????????????????</p>}
        {((player.currentLevel <= 4 && badge.todo === 0) ||
          player.currentLevel == 5) && <p>???????????????????????????????????????</p>}

        {/* change badge collection to be slidable */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -600 + width, right: 0 }}
          className={classes.badges}
        >
          {/* Suggestion: change badge to component for future convenience*/}
          {/* 1st Badge for situation of level 1-4 */}
          <div className={classes.badge}>
            <Img {...getBadge(badge.received)} />
            <Button
              size="m"
              active={badge.todo === 0}
              color={badge.todo === 0 ? "gold" : "gray"}
              className={classes.btn}
              onClick={badge.todo === 0 ? getCertificateOneHandler : null}
            >
              {badge.todo === 0 ? "?????????" : "?????????"}
            </Button>
            <Img
              {...getAvatar(player.avatar ?? 2)}
              className={classNames(
                classes.avatar,
                avatarClassName || classes.baby
              )}
            />
          </div>
          {/* 2nd Badge for level 5: pass or fail */}
          {player.currentLevel >= 5 ? (
            <div className={classes.badge}>
              <Img {...getBadge(5)} />
              <Button
                size="m"
                active={true}
                color="gold"
                className={classes.btn}
                onClick={getCertificateTwoHandler}
              >
                ?????????
              </Button>
              <Img
                {...getAvatar(player.avatar ?? 2)}
                className={classNames(
                  classes.avatar,
                  avatarClassName || classes.baby
                )}
              />
            </div>
          ) : (
            <div className={classes.badge}>
              <Img {...getBadge(6)} />
              <Button
                size="m"
                active={false}
                color={"gray"}
                className={classes.btn}
                onClick={null}
              >
                ?????????
              </Button>
              <Img
                {...getAvatar(player.avatar ?? 2)}
                className={classNames(
                  classes.avatar,
                  avatarClassName || classes.baby
                )}
              />
            </div>
          )}
        </motion.div>
      </section>

      <section className={classes.actions}>
        <h3>????????????</h3>
        <p>
          <Link href="/manual">????????????</Link>
        </p>
        <p className={classes.danger}>
          <span onClick={exitHandler}>????????????</span>
        </p>
      </section>
    </>
  );
};

export default Me;
