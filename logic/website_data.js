import { createSharedQuery } from "@/shared/models/lib/query";
import { WebsiteDataModel } from "@/models/website_data";
import createSubscription from "@/shared/utils/createSubscription";
import { noop } from "@/shared/utils/none";
/** @type {import("@/utils/createSubscription").Subscription<WebsiteData>} */
export const [useWebsiteData, onWebsiteData, , getWebsiteData] =
  createSubscription((setData) => {
    WebsiteDataModel.getOrCreate("Website Info").then(function (e) {
      setData(e);
      const [, onNewData] = createSharedQuery(e.asQuery(), { watch: true });
      onNewData(function ({ data }) {
        if (data) setData(data);
      });
    });
  });

// onWebsiteData(noop); // Causes issues with rehydration on pages with useWebsiteData

export const getCurrentSession = () => getWebsiteData()?.currentSession;
/**
 *
 * @returns {import("../models/website_data").WebsiteData}
 */
export default useWebsiteData;
