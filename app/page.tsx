import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { getSubjectColor } from '@/constants'
import { getAllCompanions, getRecentSession } from '@/lib/actions/companion.action'
import React from 'react'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsData = await getRecentSession(10) as Companion[]
  
  console.log("recentSessionsData: ", recentSessionsData)

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className='home-section'>
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
        {recentSessionsData.length > 0 && (
          <CompanionsList 
            title="Recently completed sessions"
            companions={recentSessionsData}
            classNames="w-2/3 max-lg:w-full"
          />
        )}
        <CTA />
      </section>
    </main>
  )
}

export default Page