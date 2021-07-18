export type IChartsProps = {
    chartType: 'line' | 'bar'
    label: string;
    data: Record<any, any>
}