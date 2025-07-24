"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { subjects } from '@/constants'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SubjectFilter = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [input, setInput] = useState("")

    useEffect(() => {
        let newUrl = ""
        if (input) {
            if (input === "all") {
                newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"]
                })
                router.push(newUrl, { scroll: false })
            } else {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "subject",
                    value: input
                })
                router.push(newUrl)
            }
            
        } else {
            if (pathname === '/companions') {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"]
                })
                router.push(newUrl, { scroll: false })
            }
        }
    }, [input, searchParams, router, pathname])
    
    return (
        <div>
            <Select
                onValueChange={setInput}
                defaultValue={"all"}
                value={input}
            >
                <SelectTrigger className="input">
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key="all" value="all"
                            className="capitalize">
                            all subjects
                        </SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}
                            className="capitalize">
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilter