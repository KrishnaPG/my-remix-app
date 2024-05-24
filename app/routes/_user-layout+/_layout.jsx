import React, { Suspense } from "react";
import { Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
// import { RemixSseProvider } from "remix-sse/dist/client";

import { authenticator } from "../../services/auth/auth.server";

import LoadInProgress from "../../components/load-in-progress";
import { useBGOptions } from "../../components/anim-background/useBGOptions";
import { getBGImage, getUIOptions } from "../../globals/settings.client";

const AnimBG = React.lazy(() => import("../../components/anim-background"));

export async function loader({ params, request, context }) {
  const url = new URL(request.url);
  await authenticator.isAuthenticated(request, {
    failureRedirect: `/login?returnTo=${url.pathname}`,
  });
  return json({});
}

const px2rem = px2remTransformer({
  rootValue: 16, // 16px = 1rem; @default 16
});

export default function Layout() {
  const { isSSR, bgImage, uiOptions } = useBGOptions(getBGImage, getUIOptions);
  if (isSSR) return <div className="LoadingMsg">Loading...</div>;
  return (
    <Suspense fallback={<LoadInProgress />}>
      <AnimBG {...uiOptions} bgImage={bgImage} isIndexPage={true}>
        <StyleProvider transformers={[px2rem]}>
            <Outlet />
        </StyleProvider>
      </AnimBG>
    </Suspense>
  );
}
