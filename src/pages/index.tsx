/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.js
import axios from "axios";

import { Heart } from "@phosphor-icons/react";

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
    <div className="bg-main-color">
      Apenas um teste de build <Heart size={24} color="red" />
    </div>
  );
}

export default Home;
