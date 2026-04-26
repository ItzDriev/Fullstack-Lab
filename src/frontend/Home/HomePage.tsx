import { Heading1 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Navigation/Navbar";

function HomePage() {
  const { isLoggedIn, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <h1>Welcome back, {user?.username}</h1>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
}

export default HomePage;
