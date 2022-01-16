import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { useCachedAjaxRequest } from "Hooks/useCachedAjaxRequest";

const lineLayout = {
  "line-cap": "round",
  "line-join": "round",
};

const MapLineComponent = ({ fromLocation, toLocation }) => {
  const cachedAjaxRequest = useCachedAjaxRequest({ fromLocation, toLocation });

  console.log({ cachedAjaxRequest });

  return (
    <Layer
      type="line"
      // sourceId="source_id"
      layout={lineLayout}
      key={`_2_`}
      paint={{
        "line-color": "#ff00ff",
        "line-width": 2,
      }}
    >
      <Feature coordinates={cachedAjaxRequest} />
    </Layer>
  );
};

export default MapLineComponent;
