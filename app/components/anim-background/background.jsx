import { useEffect, useState } from "react";
import { Animator, Animated, Dots, Puffs, aa, cx } from "@arwes/react";

import styles from "./background.module.css";

const Background = ({ className, animated, bgImage, isIndexPage }) => {
  return (
    <Animator merge combine>
      <Animated role="presentation" className={cx(styles.root, className)} animated={animated}>
        <Animator>
          <Animated
            as="picture"
            role="presentation"
            className={styles.imageLayer}
            style={{
              filter: `brightness(${isIndexPage ? 0.4 : 0.3}) blur(${isIndexPage ? 0 : 10}px)`,
            }}
            animated={[aa("opacity", 0.8, 1), aa("scale", 1.05, 1)]}
          >
            {/* <source media='(min-width:1280px)' srcSet='/assets/images/background-large.webp' type='image/webp' />
            <source media='(min-width:1280px)' srcSet='/assets/images/background-large.jpg' type='image/jpeg' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.webp' type='image/webp' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.jpg' type='image/jpeg' />
            <source media='(max-width:767px)' srcSet='/assets/images/background-small.webp' type='image/webp' /> */}
            <img src={bgImage} alt="Background" />
          </Animated>
        </Animator>

        <Animator duration={{ enter: 2 }} unmountOnDisabled>
          <Dots className={styles.dotsLayer} color="hsla(180, 29%, 72%, 0.15)" size={2} distance={40} originInverted />
        </Animator>

        <Animator duration={{ enter: 2, interval: 4 }} unmountOnDisabled>
          <Puffs className={styles.puffsLayer} color="hsla(180, 29%, 72%, 0.25)" quantity={20} />
        </Animator>
      </Animated>
    </Animator>
  );
};

export default Background;
