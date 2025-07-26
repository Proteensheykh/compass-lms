import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { getSubjectColor } from '@/constants'
import { getAllCompanions, getRecentSession } from '@/lib/actions/companion.action'
import React from 'react'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsData = await getRecentSession(10) as Companion[]
  // Get unique companions(remove duplicates)
  const uniqueCompanions = Array.from(new Map(recentSessionsData.map(item => [item.id, item])).values())
  
  console.log("recentSessionsData: ", recentSessionsData)

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className='home-section justify-start'>
        {companions.map((companion, index) => {
          if (index < 3) {
            return (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            );
          }
          return null;
        })}
        </section>

      <section className='home-section'>
        {uniqueCompanions.length > 0 && (
          <CompanionsList 
            title="Recently completed sessions"
            companions={uniqueCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
        )}
        <CTA />
      </section>
    </main>
  )
}

export default Page