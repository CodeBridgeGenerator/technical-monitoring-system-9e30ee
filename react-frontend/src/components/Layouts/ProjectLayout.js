import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import ChecksPage from "../ChecksPage/ChecksPage";
import CheckListsPage from "../CheckListsPage/CheckListsPage";
import CheckListFormsPage from "../CheckListFormsPage/CheckListFormsPage";
import TimerServicesPage from "../TimerServicesPage/TimerServicesPage";
import BreakDownTicketsPage from "../BreakDownTicketsPage/BreakDownTicketsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "checks":
                return <ChecksPage />;
case "checkLists":
                return <CheckListsPage />;
case "checkListForms":
                return <CheckListFormsPage />;
case "timerServices":
                return <TimerServicesPage />;
case "breakDownTickets":
                return <BreakDownTicketsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
