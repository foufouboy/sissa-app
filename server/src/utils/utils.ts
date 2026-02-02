export const postgresAggregationToArray = (aggregation: string): string[] => {
    return aggregation
    .substring(1, aggregation.length - 1)
    .split(',')
    .map(item => item.trim());
}

