"use client";
import { Title } from "@/components/Title";
import { Highlight } from "@/components/Highlight";
import { Subtitle } from "@/components/Subtitle";
import Worried from "../../public/Worried-amico.svg";
import Image from "next/image";

export default function Index() {
  return (
    <main className="mx-auto w-11/12 sm:mt-10 flex md:flex-row flex-col">
      <aside className="sm:w-2/3">
        <Title className="text-3xl md:text-5xl mt-32">
          Já é <Highlight>maior de idade</Highlight>
          <br />e não sabe o que fazer?
        </Title>
        <Subtitle className="text-gray-600 md:text-[1.5rem] mt-2 w-4/5">
          Clique{" "}
          <Highlight onClick={() => (document.location.href = "/signup")}>
            aqui
          </Highlight>{" "}
          e descubra como facilitar sua transição para a vida adulta.
        </Subtitle>
      </aside>
      <div className="md:ml-auto sm:w-1/2 md:w-fit">
        <Image src={Worried} alt="" />
      </div>
    </main>
  );
}
