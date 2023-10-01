import { formatDistanceToNow } from "date-fns";

export function formatDate(date: Date): string{
    return formatDistanceToNow(date)
}