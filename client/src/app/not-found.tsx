"use client";
import { Title } from "../components/Title";
import { Subtitle } from "@/components/Subtitle";
import { Highlight } from "@/components/Highlight";
export default function NotFound() {
  return (
    <main className="w-4/5 mx-auto">
      <Title top-margin>
        Ops! Não encontramos o que você estava procurando!
      </Title>
      <Subtitle>
        Tente voltar ao{" "}
        <Highlight onClick={() => (document.location.href = "/home")}>
          início.
        </Highlight>
      </Subtitle>
    </main>
  );
}
