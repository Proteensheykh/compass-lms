import { Companion } from "@/constants"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { cn, getSubjectColor } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface CompanionsListProps {
    title: string
    companions?: Companion[]
    classNames?: string
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <article className={cn('companion-list', classNames)}>
        <h2 className="font-bold text-3xl">{title}</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-2/3" text-lg>Lessons</TableHead>
                    <TableHead text-lg>Subject</TableHead>
                    <TableHead text-lg>Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {companions?.map((companion) => (
                    <TableRow key={companion.id}>
                        <TableCell>
                            <Link href={`/companion/${companion.id}`}>
                                <div className="cursor-pointer flex items-center gap-2">
                                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(companion.subject)}}>
                                        <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-bold text-2xl">{companion.name}</h3>
                                        <p className="text-sm">{companion.topic}</p>
                                    </div>
                                </div>
                            </Link>
                        </TableCell>

                        <TableCell>
                            <div className="subject-badge w-fit max-md:hidden">
                            {companion.subject}
                            </div>
                            <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{backgroundColor: getSubjectColor(companion.subject)}}>
                                <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={18} height={18} />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2 w-full">
                            <p className="text-2xl">
                            {companion.duration} {' '} <span className="max-md:hidden">mins</span>
                            </p>
                            <Image src="/icons/clock.svg" alt="minutes" width={13.5} height={13.5} className="md:hidden"/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </article>
  )
}

export default CompanionsList