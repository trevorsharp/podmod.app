import { createRootRoute, createRoute } from "@tanstack/react-router";
import MainPage from "@ui/components/MainPage";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});

const feedConfigRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$feedId",
  component: () => {
    const { feedId } = feedConfigRoute.useParams();

    return <MainPage initialFeedId={feedId} />;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, feedConfigRoute]);

export { routeTree };
