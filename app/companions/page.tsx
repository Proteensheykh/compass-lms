import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getSubjectColor } from "@/constants";
import { getAllCompanions } from "@/lib/actions/companion.action"

type SearchParams = {
  searchParams: {
    subject?: string | string[];
    topic?: string | string[];
  };
};

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  // Convert potential array values of searchParamsto single strings
  const subject = typeof searchParams.subject === 'string' 
    ? searchParams.subject 
    : Array.isArray(searchParams.subject) 
    ? searchParams.subject[0] 
    : ""

  const topic = typeof searchParams.topic === 'string' 
    ? searchParams.topic 
    : Array.isArray(searchParams.topic) 
    ? searchParams.topic[0] 
    : ""

  const companions = await getAllCompanions({ subject, topic })

  console.log("companions: ", companions)

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>CompanionsLibrary</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            id={companion.id}
            name={companion.name}
            topic={companion.topic}
            subject={companion.subject}
            duration={companion.duration}
            color={getSubjectColor(companion.subject)}
          />
        ))}
        
      </section>
    </main>
  )
}

export default CompanionsLibrary