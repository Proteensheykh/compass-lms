"use server"

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

export const createCompanion = async (formData: CreateCompanion) => {
    const supabase = createSupabaseClient()
    const { userId: author } = await auth()

    const { data, error } = await supabase.from("companions").insert({
        ...formData,
        author,
    }).select()

    if (error || !data) throw new Error(error?.message || "Failed to create a companion")

    return data[0]
}

export type GetAllCompanions = {
    limit?: number;
    page?: number;
    topic?: string;
    subject?: string;
}

export const getAllCompanions = async ({limit = 10, page = 1, topic, subject}: GetAllCompanions) => {
    const supabase = createSupabaseClient()

    // Create the query builder without awaiting it yet
    let query = supabase.from("companions").select()

    // Apply filters if provided
    if (subject && topic) {
        query = query.ilike("subject", `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    // Apply pagination
    query = query.range((page - 1) * limit, page * limit - 1)

    // Execute the query only at the end
    const { data, error } = await query

    if (error) throw new Error(error.message || "Failed to fetch companions")

    return data || []
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from("companions").select().eq("id", id).single()

    if (error) {
        console.log(error)
        throw new Error(error.message || "Failed to fetch companion")
    }

    return data
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from("session_history").insert({
        companion_id: companionId,
        user_id: userId,
    })

    if (error) throw new Error(error.message || "Failed to add to session history")

    return data
}

export const getRecentSession = async (limit: number = 10) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from("session_history").select(`companions:companion_id(*)`).order("created_at", { ascending: false }).limit(limit)

    if (error) throw new Error(error.message || "Failed to fetch recent session")

    return data.map(({companions}) => companions)
}

export const getUserSessions = async (userId: string, limit: number = 10) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from("session_history").select(`companions:companion_id(*)`).eq("user_id", userId).order("created_at", { ascending: false }).limit(limit)

    if (error) throw new Error(error.message || "Failed to fetch user sessions")

    return data.map(({companions}) => companions)
}