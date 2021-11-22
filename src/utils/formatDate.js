import { format } from 'date-fns';

const formatDate = (date) => date ? format(date, 'MM.dd.yyyy') : '';

export default formatDate;
