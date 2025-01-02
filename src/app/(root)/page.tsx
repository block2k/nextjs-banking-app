import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name ?? "Guest"}
            subtext="Access and manage your account & transaction"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.35} />
        </header>
        RECENT ACTIVITY
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{ currentBalance: 123 }, { currentBalance: 12312 }]} />
    </section>
  );
};

export default Home;
