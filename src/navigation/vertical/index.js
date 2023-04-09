// ** Navigation sections imports
import apps from "./apps";
import dashboards from "./dashboards";

import finance from "./finance";
import product from "./product";

// ** Merge & Export
export default [...dashboards, ...finance, ...product,...apps];
// export default [ ...dashboards, ...apps,...product, ...finance,...pages, ...uiElements, ...forms, ...tables,, ...chartsAndMaps, ...others]
