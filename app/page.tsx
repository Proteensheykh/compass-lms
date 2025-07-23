import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className='home-section'>
        {recentSessions.map((session, index) => {
          if (index < 3) {
            return (
              <CompanionCard
                key={session.id}
                id={session.id}
                name={session.name}
                topic={session.topic}
                subject={session.subject}
                duration={session.duration}
                color={session.color}
              />
            );
          }
          return null;
        })}
        </section>

      <section className='home-section'>
        <CompanionsList 
        title="Recently completed sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page