"use client";
import { Title } from "../components/Title";
import { Subtitle } from "@/components/Subtitle";
import { Highlight } from "@/components/Highlight";
import NotFoundSVG from "../../public/Not found.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="w-4/5 mx-auto">
      <Title className="text-3xl" centered top-margin>
        Ops! Não encontramos o que você estava procurando!
      </Title>
      <Subtitle className="text-2xl" centered>
        Tente voltar ao{" "}
        <Highlight onClick={() => (document.location.href = "/home")}>
          início.
        </Highlight>
      </Subtitle>
      <Image className="mx-auto" height={450} src={NotFoundSVG} alt="" />
    </main>
  );
}
