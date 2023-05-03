import dayjs, { Dayjs } from 'dayjs'

interface IGenerateWeekdays {
    dayofweek: string
    date: string
}

export const generateWeekDays = (): IGenerateWeekdays[] => {
    const today: Dayjs = dayjs().startOf('day')
    const endOfWeek: Dayjs = today.add(6, 'day').endOf('day')

    dayjs.locale('sr')
    const days: IGenerateWeekdays[] = []

    let day = dayjs(today)
    while (day.isBefore(endOfWeek)) {
        days.push({
            dayofweek: day.format('ddd').toLocaleUpperCase().replace('.', ''),
            date: day.format('DD/MM/YYYY'),
        })
        day = day.add(1, 'day')
    }

    return days
}
