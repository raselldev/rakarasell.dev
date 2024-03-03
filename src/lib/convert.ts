export function ConvertDatetime(datetime: string): string {
    const inputDatetime: Date = new Date(datetime)
    const outputDateStr: string = inputDatetime.toISOString().split("T")[0]
    return outputDateStr
}