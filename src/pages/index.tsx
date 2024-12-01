/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.js
import axios from "axios";

import TopBar from "@/shared/components/top-bar";

// SSR
export const getServerSideProps = async () => {
  try {
    const response = await axios.get(
      "https://simbook-node-server.onrender.com/books"
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);

    return {
      props: {
        data: [],
      },
    };
  }
};

export function Home({ data }: any) {
  console.log("data", data);

  return (
    <div className="flex items-center justify-center flex-col">
      <TopBar />
    </div>
  );
}

export default Home;
