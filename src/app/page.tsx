import MainBar from "@/components/MainBar/MainBar";
import Sidebar from "@/components/Sidebar/Sidebar"

export default function Home() {
  return (
    <div className="home w-full h-screen">
      <div className="flex w-full h-full">
        <Sidebar />
        <MainBar />
      </div>
    </div>
  );
}
