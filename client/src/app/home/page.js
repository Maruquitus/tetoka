import { Post } from "@/components/Post";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 items-stretch md:grid-cols-2 rounded-lg mx-auto h-80 gap-x-4 gap-y-2 mt-10 w-4/5">
        <Post
          title="Concurso PMCE: oportunidade imperdível"
          content="A Polícia Militar do Ceará está com inscrições abertas para o concurso público 2024. São 500 vagas para soldado, com salário inicial de R$ 4.200,00. O prazo para se inscrever é até 31 de agosto, e as provas serão realizadas em novembro. Prepare-se e garanta sua vaga!"
        />
        <Post
          title="Participe do concurso da PMCE 2024"
          content="A PMCE abriu inscrições para o concurso de soldado 2024. São 500 vagas com salário inicial de R$ 4.200,00. Inscrições até 31 de agosto, provas em novembro. Não perca essa chance de começar uma carreira na Polícia Militar!"
        />
        <Post
          title="Concurso para soldado da PMCE 2024"
          content="A Polícia Militar do Ceará anuncia concurso com 500 vagas para soldado e salário inicial de R$ 4.200,00. Inscrições abertas até 31 de agosto, com provas em novembro. Aproveite essa oportunidade!"
        />
        <Post
          title="Inscrições abertas para o concurso da PMCE"
          content="A PMCE está com inscrições abertas para o concurso público 2024. São 500 vagas para soldado, com salário inicial de R$ 4.200,00. Inscrições até 31 de agosto e provas em novembro. Garanta sua vaga e comece sua carreira na Polícia Militar!"
        />
      </div>
    </main>
  );
}
