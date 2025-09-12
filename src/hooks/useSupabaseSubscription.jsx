import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "../supabase/supabase.config"
export const useSupabaseSubscription = ({channelName, options, queryKey}) => {
    const queryClient = useQueryClient()
    useEffect(() => {
        const subscription = supabase.channel(channelName).on("postgres_changes", options, (payload) => {
            const {eventType} = payload
            if (["INSERT", "UPDATE", "DELETE"].includes(eventType)) {
                queryClient.invalidateQueries({queryKey})
            }
        }).subscribe()
        return () => {
            supabase.removeChannel(subscription)
        }

    }, [channelName, options, queryKey, queryClient])
}