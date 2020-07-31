export const formatData = (data: string[][]): [{[field: string]: string}[], string[]] => {
    const header = data.shift() as string[]
    const result: {[field: string]: string}[] = [] 

    for (const row of data) {
        const record: {[field: string]: string} = {}
        for (const index in row) {
            if (!header[index]) {
                continue
            }
            record[header[index]] = row[index]
        }

        result.push(record)
    }

    return [result, header]
}
