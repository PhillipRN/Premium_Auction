import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import MyPage from "../pages/mypage/page";
import ActiveBidsPage from '../pages/mypage/components/ActiveBidsPage';
import WonAuctionsPage from '../pages/mypage/components/WonAuctionsPage';
import FavoritesPage from '../pages/mypage/components/FavoritesPage';
import TotalSpentPage from '../pages/mypage/components/TotalSpentPage';
import AuctionsPage from '../pages/auctions/page';
import AboutPage from '../pages/about/page';
import FAQPage from '../pages/faq/page';
import TermsPage from '../pages/terms/page';
import PrivacyPage from '../pages/privacy/page';
import AdminPage from '../pages/admin/page';
import AdminProductsPage from '../pages/admin/products/page';
import AdminAuctionsPage from '../pages/admin/auctions/page';
import AdminUsersPage from '../pages/admin/users/page';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auctions",
    element: <AuctionsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/mypage/active-bids",
    element: <ActiveBidsPage />,
  },
  {
    path: "/mypage/won-auctions",
    element: <WonAuctionsPage />,
  },
  {
    path: "/mypage/favorites",
    element: <FavoritesPage />,
  },
  {
    path: "/mypage/total-spent",
    element: <TotalSpentPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/products",
    element: <AdminProductsPage />,
  },
  {
    path: "/admin/auctions",
    element: <AdminAuctionsPage />,
  },
  {
    path: "/admin/users",
    element: <AdminUsersPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
