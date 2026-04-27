import { useAuth } from "../context/AuthContext";
import Navbar from "../Navigation/Navbar";

function HomePage() {
  const { isLoggedIn, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center h-screen"
          style={{ backgroundImage: "url('/Naxx.png')" }}
        />

        {/* Color Overlay + Blur */}
        <div className="absolute inset-0 bg-(--mainBG)/70 backdrop-blur-sm" />

        {/* Content */}
        <div className="z-10 relative pt-16">
          {isLoggedIn ? (
            <h1 className="p-8 text-white text-3xl">
              Welcome back, {user?.username}
            </h1>
          ) : (
            <h1 className="p-8 text-white text-3xl">You are not logged in</h1>
          )}
        </div>
      </main>
    </>
  );
}

export default HomePage;
