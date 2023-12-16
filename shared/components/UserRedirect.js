import { useRouter } from "next/router";
import isServerSide from "@/shared/utils/is_server_side";
import FullscreenLoader from "./FullscreenLoader";
import useUserData from "@/shared/logic/user_data";

export default function UserRedirect({
  redirectOnUser,
  redirectOnNoUser,
  children,
}) {
  const userData = useUserData();
  const router = useRouter();
  if (userData === undefined) {
    return <FullscreenLoader />;
  } else if (userData === null) {
    if (redirectOnNoUser) {
      if (!isServerSide) router.replace("/login");
      return <FullscreenLoader />;
    }
  } else if (redirectOnUser || !router.route.startsWith(userData.getRoute())) {
    if (!isServerSide) router.replace(userData.getRoute());
    return <FullscreenLoader />;
  }
  return children;
}
