import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AssetsPage } from "@pages/assets/AssetsPage";
import { AutomationPage } from "@pages/automation/AutomationPage";
import { DashboardPage } from "@pages/dashboard/DashboardPage";
import { IntegrationsPage } from "@pages/integrations/IntegrationsPage";
import { KnowledgeArticlePage } from "@pages/knowledge-base/KnowledgeArticlePage";
import { KnowledgeBasePage } from "@pages/knowledge-base/KnowledgeBasePage";
import { OrgStructurePage } from "@pages/org-structure/OrgStructurePage";
import { RequestsPage } from "@pages/requests/RequestsPage";
import { UserProfilePage } from "@pages/user/UserProfilePage";

import { AppLayout } from "@widgets/layout/ui/AppLayout";

const ProtectedArea = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <ProtectedArea />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "assets", element: <AssetsPage /> },
          { path: "org-structure", element: <OrgStructurePage /> },
          { path: "requests", element: <RequestsPage /> },
          { path: "knowledge-base", element: <KnowledgeBasePage /> },
          { path: "knowledge-base/:articleId", element: <KnowledgeArticlePage /> },
          { path: "automation", element: <AutomationPage /> },
          { path: "integrations", element: <IntegrationsPage /> },
          { path: "users/:userId", element: <UserProfilePage /> }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
