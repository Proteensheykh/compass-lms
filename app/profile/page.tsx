import { getUserCompanions, getUserSessions } from "@/lib/actions/companion.action"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion"
import CompanionsList from "@/components/CompanionsList"
import { ChevronDown, ChevronUp } from "lucide-react"

const Profile = async () => {

  const user = await currentUser()

  if (!user) return redirect("/sign-in")

  const companions = await getUserCompanions(user.id)
  const sessionHistory = await getUserSessions(user.id) as Companion[]

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex items-center gap-4">
          <Image src={user.imageUrl!} alt={user.firstName!} width={100} height={100} />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">{user.firstName!} {user.lastName!}</h2>
            <p className="text-sm">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <div className="border border-black rounded-lg p-2 flex flex-col h-fit gap-2">
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" alt="Lessons Completed" width={20} height={20} />
                <p className="text-2xl font-bold">{sessionHistory.length}</p>
              </div>
              <p className="text-sm">Lessons Completed</p>
            </div>
            <div className="border border-black rounded-lg p-2 flex flex-col h-fit gap-2">
              <div className="flex items-center gap-2">
                <Image src="/icons/cap.svg" alt="Cap" width={20} height={20} />
                <p className="text-2xl font-bold">{companions.length}</p>
              </div>
              <p className="text-sm">Companions Created</p>
            </div>
          </div>
        </div>

      </section>

      <Accordion type="multiple" defaultValue={["recent", "companions"]}>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold cursor-pointer hover:underline py-2">Recent Sessions <span className="text-sm">(click to expand)</span></AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent Sessions" companions={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold cursor-pointer hover:underline py-2">My Companions ({companions.length}) <span className="text-sm"></span></AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
    </main>
  )
}

export default Profile