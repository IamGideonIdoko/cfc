export const formatNumber = (val: number | string) => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
