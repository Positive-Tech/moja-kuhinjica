import dayjs, { Dayjs } from 'dayjs'

interface IGenerateWeekdays {
    dayofweek: string
    date: string
}

export const generateWeekDays = (): IGenerateWeekdays[] => {
    const today: Dayjs = dayjs().startOf('day')
    const endOfWeek: Dayjs = today.add(6, 'day').endOf('day')

    dayjs.locale('sr')
    const weekdayRange: IGenerateWeekdays[] = []

    let currentDay = dayjs(today)
    while (currentDay.isBefore(endOfWeek)) {
        weekdayRange.push({
            dayofweek: currentDay
                .format('ddd')
                .toLocaleUpperCase()
                .replace('.', ''),
            date: currentDay.format('DD/MM/YYYY'),
        })
        currentDay = currentDay.add(1, 'day')
    }

    return weekdayRange
}
