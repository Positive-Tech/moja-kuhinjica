import dayjs from 'dayjs'
import { DAYS } from 'src/constants/constants'

export const generateWeekdays = (): string[] => {
    dayjs.locale('sr')
    const formattedWeekdays: string[] = []
    let currentDate = dayjs().startOf('week')
    DAYS.forEach((day) => {
        const formattedDate = currentDate
            .format('ddd')
            .toLocaleUpperCase()
            .replace('.', '')
        formattedWeekdays.push(formattedDate)
        currentDate = currentDate.add(1, 'day')
    })
    return formattedWeekdays
}
