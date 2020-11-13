import React, { Suspense } from "react";
import Preloader from "../mini-components/Preloader";

const WithSuspence = (Component) => {
  return () => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component />
      </Suspense>
    );
  };
};

export default WithSuspence;
