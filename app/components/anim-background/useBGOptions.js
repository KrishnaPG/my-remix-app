import React, { useEffect, useState } from "react";
/**
  @example
    import { getBGImage, getUIOptions } from "../../globals/settings.client";
    import { useBGOptions } from "../../components/anim-background/useBGOptions";
    
    export default function Layout() {
      const { bgImage, uiOptions } = useBGOptions(getBGImage, getUIOptions);
      
      return (
        <AnimBG {...uiOptions} bgImage={bgImage} isIndexPage={true}>
          <StyleProvider transformers={[px2rem]}>
            <Outlet />
          </StyleProvider>
        </AnimBG>
      );
    }
 */
export function useBGOptions(getBGImage, getUIOptions) {
  const [isSSR, setIsSSR] = useState(true);
  // We change the background on the client side dynamically.
  // But Remix is server rendered, we give it a very small bgImage file as default,
  // which will be replaced on the client on mount. Same goes with UIOptions()
  const [bgImage, setBGImage] = useState("/default-bg.png");
  const [uiOptions, setUIOptions] = useState({});

  // on mount adjust the settings for the client
  useEffect(() => {
    setIsSSR(getBGImage ? false : true);
    setUIOptions(getUIOptions());
    setBGImage(getBGImage(Math.ceil(Date.now() / (1000 * 60 * 60)))); // change once per hour (if page reloaded)
  }, []);

  return {isSSR, bgImage, uiOptions };
}
